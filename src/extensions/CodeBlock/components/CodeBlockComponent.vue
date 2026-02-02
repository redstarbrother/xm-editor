<template>
  <node-view-wrapper :class="[props.extension.options.HTMLAttributes?.class, { 'is-focused': props.selected }]" ref="wrapperRef" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="code-block-actions" contenteditable="false" ref="actionsRef" :style="{ 
      ...actionsFloatingStyles, 
      right: 'auto', 
      opacity: (isHovered || showLanguageList) ? 1 : 0, 
      pointerEvents: (isHovered || showLanguageList) ? 'auto' : 'none',
      transition: 'opacity 0.2s'
    }">
      <div class="language-selector" ref="langSelectorRef">
        <div class="current-language" @click="toggleLanguageList">
          {{ selectedLanguage || 'Plain Text' }}
          <ChevronDown class="icon-small" />
        </div>
        <Teleport to="body">
        <div v-if="showLanguageList" class="editor-content" style="position: absolute; top: 0; left: 0; width: 100%; height: 0; pointer-events: none; z-index: 9999;">
          <div class="language-list-dropdown" ref="dropdownRef" :style="dropdownFloatingStyles" style="pointer-events: auto;">
              <input type="text" v-model="searchQuery" placeholder="搜索语言..." class="language-search" @click.stop
                @keydown="handleKeydown" ref="searchInputRef" />
              <div class="language-options" ref="optionsListRef">
                <div class="language-option" @click="selectLanguage(null)"
                  :class="{ active: selectedLanguage === null, highlighted: highlightedIndex === 0 }">
                  Plain Text
                  <Check v-if="selectedLanguage === null" class="icon-check" />
                </div>
                <div v-for="(lang, index) in filteredLanguages" :key="lang" class="language-option"
                  @click="selectLanguage(lang)"
                  :class="{ active: selectedLanguage === lang, highlighted: highlightedIndex === index + 1 }">
                  {{ lang }}
                  <Check v-if="selectedLanguage === lang" class="icon-check" />
                </div>
              </div>
            </div>
          </div>
        </Teleport>
      </div>
      <div class="xm-toolbar-divider"></div>
      <div class="actions-group">
        <button class="code-block-copy" @click="copyToClipboard" :title="copied ? '已复制' : '复制'">
          <Check v-if="copied" class="icon" />
          <Copy v-else class="icon" />
        </button>
      </div>
    </div>
    <div class="code-block-container">
      <div class="code-block-gutter" contenteditable="false">
        <div v-for="index in lineCount" :key="index" class="code-block-line-number">{{ index }}</div>
      </div>
      <div class="code-block-content">
        <code class="hljs"><node-view-content /></code>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { Copy, Check, ChevronDown } from 'lucide-vue-next'
import { useFloating, autoUpdate, offset, flip, shift } from '@floating-ui/vue'

const props = defineProps({
  ...nodeViewProps,
})

const isHovered = ref(false)
const copied = ref(false)
const showLanguageList = ref(false)
const searchQuery = ref('')
const wrapperRef = ref(null)
const actionsRef = ref(null)
const langSelectorRef = ref(null)
const searchInputRef = ref(null)
const optionsListRef = ref(null)
const dropdownRef = ref(null)
const highlightedIndex = ref(0)

const lineCount = computed(() => {
  if (!props.node.textContent) return 1
  return props.node.textContent.split('\n').length
})

const wrapperEl = computed(() => wrapperRef.value?.$el || wrapperRef.value)

// Floating UI for Code Block Actions
const { floatingStyles: actionsFloatingStyles } = useFloating(wrapperEl, actionsRef, {
  placement: 'top-end',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(({ rects }) => {
      return -rects.floating.height - 4
    }),
    shift({ padding: 4 })
  ]
})

// Floating UI for Language List Dropdown
const { floatingStyles: dropdownFloatingStyles } = useFloating(langSelectorRef, dropdownRef, {
  placement: 'bottom-start',
  strategy: 'fixed',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(4),
    flip(),
    shift({ padding: 4 })
  ]
})

const languages = ref(
  props.extension.options.lowlight.listLanguages(),
)

const filteredLanguages = computed(() => {
  if (!searchQuery.value) return languages.value
  return languages.value.filter(lang =>
    lang.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 重置高亮索引当搜索变化时
watch(searchQuery, () => {
  highlightedIndex.value = 0
})

const toggleLanguageList = () => {
  showLanguageList.value = !showLanguageList.value
  if (showLanguageList.value) {
    searchQuery.value = ''
    highlightedIndex.value = 0 // Reset highlight
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  }
}

const selectLanguage = (lang) => {
  selectedLanguage.value = lang
  showLanguageList.value = false
}

const handleKeydown = (e) => {
  const totalOptions = filteredLanguages.value.length + 1 // +1 for Plain Text

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    highlightedIndex.value = (highlightedIndex.value + 1) % totalOptions
    scrollToHighlighted()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    highlightedIndex.value = (highlightedIndex.value - 1 + totalOptions) % totalOptions
    scrollToHighlighted()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (highlightedIndex.value === 0) {
      selectLanguage(null)
    } else {
      selectLanguage(filteredLanguages.value[highlightedIndex.value - 1])
    }
  } else if (e.key === 'Escape') {
    showLanguageList.value = false
  }
}

const scrollToHighlighted = () => {
  nextTick(() => {
    if (!optionsListRef.value) return
    const highlightedEl = optionsListRef.value.children[highlightedIndex.value]
    if (highlightedEl) {
      highlightedEl.scrollIntoView({ block: 'nearest' })
    }
  })
}

const handleClickOutside = (event) => {
  const target = event.target
  const isInsideSelector = langSelectorRef.value && langSelectorRef.value.contains(target)
  const isInsideDropdown = dropdownRef.value && dropdownRef.value.contains(target)
  
  if (!isInsideSelector && !isInsideDropdown) {
    showLanguageList.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 复制代码到剪贴板
const copyToClipboard = () => {
  const codeContent = props.node.textContent
  navigator.clipboard
    .writeText(codeContent)
    .then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
    .catch((err) => {
      console.error('Failed to copy code: ', err)
    })
}

// 监控代码类型变化
const selectedLanguage = computed({
  get() {
    return props.node.attrs.language
  },
  set(language) {
    props.updateAttributes({ language })
  },
})
</script>

<style>
.editor-content .code-block-actions {
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid rgba(55, 53, 47, 0.09);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 4px 8px rgba(0, 0, 0, 0.04);
  gap: 4px;
  padding: 4px;
  background-color: #fff;
  z-index: 10;
  height: auto;
  width: auto;
}

.xm-toolbar-divider {
  width: 1px;
  height: 24px;
  background-color: rgba(55, 53, 47, 0.09);
  margin: 0 4px;
}

/* Language Selector */
.editor-content .language-selector {
  position: relative;
  font-size: 12px;
  user-select: none;
  z-index: 21;
  /* Ensure dropdown is above other elements */
}

.editor-content .current-language {
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  transition: background-color 0.2s;
  color: #aeb5bc;
  /* Default Notion inactive color */
  font-weight: 500;
  line-height: 1;
}

.editor-content .current-language:hover {
  background-color: rgba(55, 53, 47, 0.08);
  color: #37352f;
}

.editor-content .icon-small {
  width: 12px;
  height: 12px;
  opacity: 0.8;
}

.editor-content .language-list-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  /* Align to left of the selector */
  right: auto;
  background: white;
  border-radius: 6px;
  box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;
  width: 220px;
  max-height: 320px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 100;
  margin-top: 4px;
  padding: 6px;
}

.editor-content .language-search {
  padding: 6px 10px;
  margin-bottom: 6px;
  border: 1px solid rgba(55, 53, 47, 0.16);
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  background: white;
  color: #37352f;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.editor-content .language-search:focus {
  border-color: #2383e2;
  box-shadow: 0 0 0 1px #2383e2;
}

.editor-content .language-options {
  overflow-y: auto;
  flex: 1;
  padding: 5px;
}

.editor-content .language-option {
  padding: 6px 8px;
  margin: 0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #37352f;
  transition: background-color 0.1s;
}

.editor-content .language-option:hover,
.editor-content .language-option.highlighted {
  background-color: rgba(55, 53, 47, 0.08);
}

.editor-content .language-option.active {
  background-color: transparent;
  font-weight: 500;
}

.editor-content .icon-check {
  width: 14px;
  height: 14px;
  color: #37352f;
}

/* Copy Button */
.editor-content .code-block-copy {
  background: transparent;
  border: none;
  padding: 4px;
  border-radius: 3px;
  cursor: pointer;
  color: #aeb5bc;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  width: 28px;
  height: 28px;
}

.editor-content .code-block-copy:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #37352f;
}

.editor-content .code-block-copy .icon {
  width: 16px;
  height: 16px;
}

.editor-content .code-block-container {
  display: flex;
  align-items: flex-start;
  width: 100%;
  line-height: 1.6; /* Ensure consistent line height */
}

.editor-content .code-block-gutter {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding-right: 12px;
  text-align: right;
  color: #aeb5bc;
  user-select: none;
  min-width: 20px;
}

.editor-content .code-block-content {
  flex: 1;
  min-width: 0;
  overflow-x: auto;
}

.editor-content .code-block-content .hljs {
  line-height: 1.6;
  white-space: pre;
}
</style>
