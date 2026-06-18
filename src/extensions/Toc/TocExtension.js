import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { extractHeadings, debounce } from './tocUtils'
import { createScrollHighlighter } from './tocHighlight'

/**
 * TOC Tiptap Extension
 * 
 * 通过 ProseMirror Plugin 监听文档变更，自动提取标题信息。
 * 滚动高亮检测统一在 Extension 层完成，storage 暴露 activeId。
 * 
 * 提供两种模式：
 * - 'panel': 渲染内置目录面板（默认）
 * - 'data': 仅输出数据，开发者自行渲染
 * 
 * storage 对外暴露：
 * - tocItems: 目录标题列表
 * - activeId: 当前滚动激活的标题 ID
 * - highlighter: 滚动高亮控制器（setActiveId / forceUpdate 等）
 * 
 * 回调：
 * - onTocUpdate(tocItems, activeId): 标题列表或激活 ID 变更时触发
 */

export const TocPluginKey = new PluginKey('toc')

const TocExtension = Extension.create({
  name: 'toc',

  addOptions() {
    return {
      // 目录模式：'panel' | 'data'
      mode: 'panel',
      // 参与目录的标题层级
      levels: [1, 2, 3, 4, 5, 6],
      // 防抖延迟
      debounce: 300,
      // 面板位置
      position: 'right',
      // 面板默认是否折叠
      collapsed: false,
      // 面板标题
      title: '目录',
      // 是否滚动时高亮当前标题
      highlightOnScroll: true,
      // TOC 数据更新回调（data 模式下由外部使用）
      // 签名：(tocItems, activeId) => void
      onTocUpdate: null,
    }
  },

  addStorage() {
    return {
      // 目录数据存储
      tocItems: [],
      // 当前激活的标题 ID
      activeId: null,
      // 配置选项引用
      options: {},
      // 滚动高亮控制器（setup 后赋值）
      highlighter: null,
      // 目录标题
      title: '目录',
    }
  },

  onCreate() {
    // 将 options 存入 storage，以便外部访问
    this.storage.options = this.options
    // 初始化标题
    this.storage.title = this.options.title || '目录'

    // 初始提取一次
    const headings = extractHeadings(this.editor.state.doc, this.options.levels)
    this.storage.tocItems = headings

    // 触发回调
    this.options.onTocUpdate?.(headings, null)

    // 设置滚动高亮检测
    if (this.options.highlightOnScroll) {
      const storage = this.storage
      const options = this.options

      const highlighter = createScrollHighlighter(this.editor, {
        getItems: () => storage.tocItems,
        onActiveChange: (newId, _oldId) => {
          storage.activeId = newId
          // 触发回调，同时传递 tocItems 和 activeId
          options.onTocUpdate?.(storage.tocItems, newId)
        },
      })

      storage.highlighter = highlighter
      highlighter.setup()
    }
  },

  onDestroy() {
    // 清理滚动监听
    if (this.storage.highlighter) {
      this.storage.highlighter.cleanup()
      this.storage.highlighter = null
    }
  },

  addProseMirrorPlugins() {
    const extensionOptions = this.options
    const storage = this.storage

    // 创建防抖的更新函数
    const debouncedUpdate = debounce((doc) => {
      const headings = extractHeadings(doc, extensionOptions.levels)
      storage.tocItems = headings

      // 触发回调
      extensionOptions.onTocUpdate?.(headings, storage.activeId)

      // 标题变化后重新检测激活项
      if (storage.highlighter) {
        storage.highlighter.forceUpdate()
      }
    }, extensionOptions.debounce)

    return [
      new Plugin({
        key: TocPluginKey,

        state: {
          init(_, state) {
            return extractHeadings(state.doc, extensionOptions.levels)
          },
          apply(tr, oldState, _oldEditorState, newEditorState) {
            // 只在文档发生变化时重新提取
            if (tr.docChanged) {
              const headings = extractHeadings(newEditorState.doc, extensionOptions.levels)
              storage.tocItems = headings

              // 使用防抖触发回调（避免频繁输入时的性能问题）
              debouncedUpdate(newEditorState.doc)

              return headings
            }
            return oldState
          },
        },

        props: {
          // 提供给外部读取 TOC 数据的方式
        },
      }),
    ]
  },
})

export default TocExtension
