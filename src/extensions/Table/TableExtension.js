import { TableKit as TiptapTable, TableView } from "@tiptap/extension-table";
import { Plugin, PluginKey } from '@tiptap/pm/state'
import TableCellExtension from './TableCellExtension'

/**
 * 自定义 TableView
 * columnResizing 插件创建 NodeView 时不会传递 HTMLAttributes，
 * 因此在这里强制注入 xm-table class，确保 CSS 样式正常生效。
 */
class XmTableView extends TableView {
  constructor(node, cellMinWidth, view) {
    super(node, cellMinWidth, view, { class: 'xm-table' })
  }
}

const TableExtension = TiptapTable.extend({

  addOptions() {
    return {
      ...this.parent?.(),
      table: {
        HTMLAttributes: {
          class: 'xm-table',
        },
        resizable: true,       // 开启列宽拖拽
        cellMinWidth: 80,      // 最小列宽 80px
        handleWidth: 5,        // 拖拽手柄宽度
        View: XmTableView,    // 使用自定义 View 确保 class 注入
      },
      // 禁用内置 TableCell，使用自定义的 TableCellExtension
      tableCell: false,
    }
  },

  addExtensions() {
    // 调用父级的 addExtensions（Table + TableHeader + TableRow，不含 TableCell）
    const extensions = this.parent?.() || []
    // 追加自定义的 TableCellExtension（支持 backgroundColor 属性）
    extensions.push(TableCellExtension)
    return extensions
  },

  // 额外快捷键（Tab/Shift-Tab/Backspace 已由内部 Table 处理）
  addKeyboardShortcuts() {
    return {
      "Alt-Enter": () => {
        return this.editor
          .chain()
          .focus()
          .addRowAfter()
          .run();
      },
      "Alt-Shift-Enter": () => {
        return this.editor
          .chain()
          .focus()
          .addRowBefore()
          .run();
      },
    };
  },

  addProseMirrorPlugins() {
    const { editor } = this;
    let rowBtn;
    let colBtn;

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
            mousedown(view, event) {
              if (event.button === 2) {
                const { state } = view
                const selection = state.selection
                if (selection && typeof selection.forEachCell === 'function') {
                  const posResult = view.posAtCoords({ left: event.clientX, top: event.clientY })
                  if (posResult) {
                    const clickPos = posResult.pos
                    let isClickedInsideSelection = false
                    selection.forEachCell((node, pos) => {
                      if (clickPos >= pos && clickPos <= pos + node.nodeSize) {
                        isClickedInsideSelection = true
                      }
                    })
                    if (isClickedInsideSelection) {
                      event.preventDefault()
                      return true
                    }
                  }
                }
              }
              return false
            },
            mousemove(view, event) {
              const target = event.target
              const table = target.closest('table')

              if (!table) {
                rowBtn.style.display = 'none'
                colBtn.style.display = 'none'
                return false
              }

              const rect = table.getBoundingClientRect()
              const threshold = 50

              // 检查右边缘 (增加列)
              if (event.clientX > rect.right - threshold && event.clientX < rect.right + threshold) {
                colBtn.style.display = 'flex'
                colBtn.style.top = `${rect.top + rect.height / 2 - 15}px`
                colBtn.style.left = `${rect.right + 5}px`
              } else {
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
