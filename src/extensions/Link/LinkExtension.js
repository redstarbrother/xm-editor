import Link from '@tiptap/extension-link'
import { Plugin } from '@tiptap/pm/state'

const LinkExtension = Link.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: false,
      autolink: false
    }
  },
  addProseMirrorPlugins() {
    // 保留父类的插件（如果有）
    const plugins = this.parent?.() || []

    // 添加自定义 Ctrl+Click 插件
    const ctrlClickPlugin = new Plugin({
      props: {
        handleDOMEvents: {
          keydown: (view, event) => {
            if (event.key === 'Control') {
              view.dom.classList.add('is-ctrl-pressed')
            }
            return false
          },
          keyup: (view, event) => {
            if (event.key === 'Control') {
              view.dom.classList.remove('is-ctrl-pressed')
            }
            return false
          },
        },
        handleClick: (view, pos, event) => {
          // 1. 检查是否按下了 Ctrl 键
          if (!event.ctrlKey) {
            return false
          }

          // 2. 检查点击位置是否有 Link 标记
          const attrs = view.state.doc.resolve(pos).marks().find(mark => mark.type.name === this.name)?.attrs

          // 3. 执行跳转
          if (attrs && attrs.href) {
            window.open(attrs.href, attrs.target || '_blank')
            return true // 阻止默认行为
          }

          return false
        },
      },
    })

    plugins.push(ctrlClickPlugin)

    return plugins
  },
})

export default LinkExtension
