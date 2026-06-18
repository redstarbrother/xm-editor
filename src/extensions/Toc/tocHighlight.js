/**
 * TOC 滚动高亮检测模块
 *
 * 与 UI 组件完全解耦，仅依赖 editor 实例。
 * 在 ProseMirror Plugin 层面监听滚动，计算当前激活的标题 ID，
 * 通过回调通知外部（TocExtension storage / onTocUpdate / 自定义渲染）。
 */

/**
 * 查找编辑器内容区的可滚动容器
 * 从编辑器 DOM 向上遍历，依据 CSS overflow 属性判断
 * @param {HTMLElement} editorDom - editor.view.dom
 * @returns {HTMLElement|null}
 */
function findScrollContainer(editorDom) {
  let parent = editorDom.parentElement

  while (parent) {
    const style = window.getComputedStyle(parent)
    const overflow = style.overflow + style.overflowY

    if (/(auto|scroll)/.test(overflow)) {
      return parent
    }

    parent = parent.parentElement
  }

  return null
}

/**
 * 根据当前滚动位置，计算应当被激活的标题 ID
 * @param {Object} editor - Tiptap editor 实例
 * @param {Array} tocItems - 目录项列表 [{id, level, text, pos}, ...]
 * @returns {string|null} 激活的标题 ID
 */
function detectActiveHeading(editor, tocItems) {
  if (!editor || !editor.view || tocItems.length === 0) return null

  const editorDom = editor.view.dom
  const scrollContainer = findScrollContainer(editorDom)

  if (!scrollContainer) return null

  const containerRect = scrollContainer.getBoundingClientRect()
  let currentActiveId = null

  // 检查是否滚动到底部
  const isAtBottom =
    Math.abs(
      scrollContainer.scrollHeight -
        scrollContainer.scrollTop -
        scrollContainer.clientHeight
    ) < 5

  if (isAtBottom) {
    currentActiveId = tocItems[tocItems.length - 1].id
  } else {
    // 遍历所有标题，找到最后一个已滚过视口上方 30% 的标题
    for (const item of tocItems) {
      let element = null

      // 优先通过 ProseMirror pos 精确定位 DOM 节点
      try {
        const node = editor.view.nodeDOM(item.pos)
        if (node && node.nodeType === 1) {
          element = node
        }
      } catch (e) {
        // pos 可能越界，忽略
      }

      // 回退：data-toc-id 属性
      if (!element) {
        element = editorDom.querySelector(`[data-toc-id="${item.id}"]`)
      }

      // 回退：id 属性
      if (!element) {
        try {
          element = editorDom.querySelector(`#${CSS.escape(item.id)}`)
        } catch (e) {
          // ignore
        }
      }

      if (!element) continue

      const rect = element.getBoundingClientRect()
      if (rect.top <= containerRect.top + containerRect.height * 0.3) {
        currentActiveId = item.id
      }
    }
  }

  // 默认激活第一个
  if (!currentActiveId && tocItems.length > 0) {
    currentActiveId = tocItems[0].id
  }

  return currentActiveId
}

/**
 * 创建滚动高亮控制器
 *
 * @param {Object} editor - Tiptap editor 实例
 * @param {Object} options
 * @param {Function} options.getItems - 返回当前 tocItems 列表的函数
 * @param {Function} options.onActiveChange - activeId 改变时的回调 (newId, oldId) => void
 * @returns {{ setup: () => void, cleanup: () => void, forceUpdate: () => void }}
 */
export function createScrollHighlighter(editor, options = {}) {
  const { getItems, onActiveChange } = options

  let scrollHandler = null
  let scrollContainer = null
  let currentActiveId = null
  let setupTimer = null

  /**
   * 核心检测 + 通知
   */
  function update() {
    const items = getItems()
    const newActiveId = detectActiveHeading(editor, items)

    if (newActiveId !== currentActiveId) {
      const oldId = currentActiveId
      currentActiveId = newActiveId
      onActiveChange?.(newActiveId, oldId)
    }
  }

  /**
   * 绑定滚动监听
   * 使用 setTimeout 延迟，确保编辑器 DOM 已完全挂载
   */
  function setup() {
    cleanup() // 先清理之前的监听

    setupTimer = setTimeout(() => {
      if (!editor || !editor.view) return

      const editorDom = editor.view.dom
      scrollContainer = findScrollContainer(editorDom)

      if (!scrollContainer) return

      let rafId = null
      scrollHandler = () => {
        if (rafId) return
        rafId = requestAnimationFrame(() => {
          update()
          rafId = null
        })
      }

      scrollContainer.addEventListener('scroll', scrollHandler, {
        passive: true,
      })

      // 初始检测一次
      update()
    }, 200)
  }

  /**
   * 清理滚动监听
   */
  function cleanup() {
    if (setupTimer) {
      clearTimeout(setupTimer)
      setupTimer = null
    }
    if (scrollHandler && scrollContainer) {
      scrollContainer.removeEventListener('scroll', scrollHandler)
    }
    scrollHandler = null
    scrollContainer = null
  }

  /**
   * 手动触发一次检测（例如点击目录项后同步状态）
   */
  function forceUpdate() {
    update()
  }

  /**
   * 获取当前激活 ID
   */
  function getActiveId() {
    return currentActiveId
  }

  /**
   * 手动设置激活 ID（例如用户点击目录项时）
   */
  function setActiveId(id) {
    if (id !== currentActiveId) {
      const oldId = currentActiveId
      currentActiveId = id
      onActiveChange?.(id, oldId)
    }
  }

  return { setup, cleanup, forceUpdate, getActiveId, setActiveId }
}
