import { TableKit as TiptapTable } from "@tiptap/extension-table";
import { Plugin, PluginKey } from '@tiptap/pm/state'

const TableExtension = TiptapTable.extend({

  addOptions() {
    return {
      ...this.parent?.(),
      table: {
        HTMLAttributes: {
          class: 'xm-table', // 你的自定义 class
        },
      },
    }
  },

  // ✨ 添加快捷键
  addKeyboardShortcuts() {
    return {
      "Alt-Enter": () => {
        return this.editor
          .chain()
          .focus()
          .addRowAfter() // 在当前行后面插入一行
          .run();
      },
    };
  },
  addProseMirrorPlugins() {
    const { editor } = this;
    let rowBtn;
    let colBtn;
    let activeTable;

    // 创建按钮的辅助函数
    const createButton = (className, icon) => {
      const btn = document.createElement('button')
      btn.className = `table-plus-btn ${className}`
      btn.innerHTML = icon
      btn.style.display = 'none'
      btn.style.position = 'fixed'
      btn.style.zIndex = '100'
      document.body.appendChild(btn)
      return btn
    }

    return [
      new Plugin({
        key: new PluginKey('tablePlus'),
        view(editorView) {
          rowBtn = createButton('row-btn', '+')
          colBtn = createButton('col-btn', '+')

          // 点击增加行
          rowBtn.onclick = () => {
            editor.chain().focus().addRowAfter().run()
          }

          // 点击增加列
          colBtn.onclick = () => {
            editor.chain().focus().addColumnAfter().run()
          }

          return {
            destroy() {
              rowBtn?.remove()
              colBtn?.remove()
            },
          }
        },
        props: {
          handleDOMEvents: {
            mousemove(view, event) {
              const target = event.target
              const table = target.closest('table')

              if (!table) {
                rowBtn.style.display = 'none'
                colBtn.style.display = 'none'
                return false
              }

              activeTable = table
              const rect = table.getBoundingClientRect()
              const threshold = 50 // 触发范围

              // 检查右边缘 (增加列)
              if (event.clientX > rect.right - threshold && event.clientX < rect.right + threshold) {
                colBtn.style.display = 'flex'
                colBtn.style.top = `${rect.top + rect.height / 2 - 15}px`
                colBtn.style.left = `${rect.right + 5}px`
              } else {
                // 如果鼠标不在按钮本身上，则隐藏
                if (event.target !== colBtn) colBtn.style.display = 'none'
              }

              // 检查底边缘 (增加行)
              if (event.clientY > rect.bottom - threshold && event.clientY < rect.bottom + threshold) {
                rowBtn.style.display = 'flex'
                rowBtn.style.left = `${rect.left + rect.width / 2 - 15}px`  
                rowBtn.style.top = `${rect.bottom + 5}px`
              } else {
                if (event.target !== rowBtn) rowBtn.style.display = 'none'
              }

              return false
            },
          },
        },
      }),
    ]
  },
});

export default TableExtension;
