<template>
  <div class="cell-color-picker">
    <div class="color-grid">
      <div
        v-for="color in cellColors"
        :key="color.name"
        class="color-item"
        :class="{ active: currentColor === color.value }"
        :title="color.name"
        @click="selectColor(color.value)"
      >
        <div
          class="color-swatch"
          :style="{
            backgroundColor: color.value || '#ffffff',
            border: color.value ? 'none' : '1px dashed #d1d5db',
          }"
        >
          <svg
            v-if="!color.value"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            class="no-color-icon"
          >
            <line x1="1" y1="13" x2="13" y2="1" stroke="#d1d5db" stroke-width="1.5" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { cellColors } from '../tableCommands'

const props = defineProps({
  editor: { type: Object, required: true },
  currentColor: { type: String, default: null },
})

const emit = defineEmits(['select', 'close'])

const selectColor = (color) => {
  props.editor.chain().focus().setCellAttribute('backgroundColor', color).run()
  emit('select', color)
  emit('close')
}
</script>

<style scoped>
.cell-color-picker {
  padding: 6px;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
}

.color-item {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  padding: 3px;
  transition: background-color 0.15s;
}

.color-item:hover {
  background-color: #f3f4f6;
}

.color-item.active {
  background-color: #e5e7eb;
}

.color-swatch {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-color-icon {
  opacity: 0.5;
}
</style>
