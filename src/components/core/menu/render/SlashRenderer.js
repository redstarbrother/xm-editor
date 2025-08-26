import { createApp, h } from 'vue'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import SlashMenu from '../SlashMenu.vue'

export function renderSlashMenu() {
  let popup
  let vm

  return {
    onStart: props => {
      vm = createApp({
        render: () =>
          h(SlashMenu, {
            items: props.items,
            command: props.command,
            editor: props.editor,
            range: props.range,
            clientRect: props.clientRect,
          }),
      })

      const el = document.createElement('div')
      document.body.appendChild(el)
      vm.mount(el)

      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        content: el,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
      })
    },
    onUpdate: props => {
      vm._instance.props.items = props.items
      vm._instance.props.command = props.command
      vm._instance.props.editor = props.editor
      vm._instance.props.range = props.range
      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      })
    },
    onExit: () => {
      popup[0].destroy()
      vm.unmount()
    },
  }
}
