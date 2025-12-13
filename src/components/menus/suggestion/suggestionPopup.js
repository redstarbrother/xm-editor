// suggestionPopup.js
import { createApp, h, reactive } from 'vue'
import tippy from 'tippy.js'
import SuggestionList from './SuggestionList.vue'

export function createSuggestionPopup({
  editor,
  clientRect,
  items,
  command,
  renderItem,
}) {
  let popup
  let vm
  let el

  // 使用 reactive 包装 props，以便在 update 时触发响应式更新
  const state = reactive({
    items,
    command,
    renderItem
  })

  // 1. 创建挂载点
  el = document.createElement('div')
  document.body.appendChild(el)

  // 2. 创建 Vue 实例
  vm = createApp({
    render: () => h(SuggestionList, {
      items: state.items,
      command: state.command,
      renderItem: state.renderItem,
      ref: 'suggestionList'
    })
  })

  // 3. 挂载
  const instance = vm.mount(el)

  // 4. 创建 Tippy 实例
  popup = tippy('body', {
    getReferenceClientRect: clientRect,
    appendTo: () => document.body,
    content: el,
    showOnCreate: true,
    interactive: true,
    trigger: 'manual',
    placement: 'bottom-start',
  })

  return {
    update(props) {
      // 更新响应式状态
      state.items = props.items
      if (props.command) state.command = props.command
      if (props.renderItem) state.renderItem = props.renderItem
      
      // 更新 popup 位置
      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      })
    },
    onKeyDown({ event }) {
      if (event.key === 'Escape') {
        popup[0].hide()
        return true
      }
      return instance.onKeyDown(event)
    },
    destroy() {
      popup[0].destroy()
      vm.unmount()
      if (document.body.contains(el)) {
        document.body.removeChild(el)
      }
    },
  }
}

