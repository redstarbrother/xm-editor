/**
 * TOC 工具函数
 * 提供目录数据提取、跳转、ID 生成等纯函数
 */

/**
 * 根据标题文本生成 slug ID
 * @param {string} text 标题文本
 * @returns {string} slug 格式的 ID
 */
export function generateId(text) {
  if (!text) return ''
  return 'heading-' + text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '')
}

/**
 * 处理重复 ID 的情况，追加序号
 * @param {string} id 基础 ID
 * @param {Map} idCountMap 已使用 ID 的计数器
 * @returns {string} 唯一的 ID
 */
export function ensureUniqueId(id, idCountMap) {
  if (!id) return ''
  
  if (idCountMap.has(id)) {
    const count = idCountMap.get(id) + 1
    idCountMap.set(id, count)
    return `${id}-${count}`
  }
  
  idCountMap.set(id, 1)
  return id
}

/**
 * 从 ProseMirror 文档中提取所有标题信息
 * @param {Object} doc ProseMirror 文档节点
 * @param {number[]} levels 需要提取的标题层级（如 [1, 2, 3]）
 * @returns {Array<{id: string, level: number, text: string, pos: number}>}
 */
export function extractHeadings(doc, levels = [1, 2, 3]) {
  const headings = []
  const idCountMap = new Map()
  
  doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      const level = node.attrs.level
      if (levels.includes(level)) {
        const text = node.textContent || ''
        const baseId = generateId(text)
        const id = ensureUniqueId(baseId, idCountMap)
        
        headings.push({
          id,
          level,
          text,
          pos,
          isActive: false,
        })
      }
    }
  })
  
  return headings
}

/**
 * 查找最近的可滚动父容器
 * 从编辑器 DOM 向上遍历，依据 CSS overflow 属性判断
 * @param {HTMLElement} element 起始元素
 * @returns {HTMLElement|Window|null}
 */
export function findScrollContainer(element) {
  let parent = element.parentElement

  while (parent) {
    // 到达 body/html 时回退到 window，避免非预期的全局滚动捕获
    if (parent === document.body || parent === document.documentElement) {
      return window
    }

    const style = window.getComputedStyle(parent)
    const overflowY = style.overflowY
    const overflow = style.overflow

    if (/(auto|scroll)/.test(overflowY) || /(auto|scroll)/.test(overflow)) {
      return parent
    }

    parent = parent.parentElement
  }

  return null
}

/**
 * 解析滚动容器：优先使用用户配置，其次执行向上遍历自动查找
 * @param {HTMLElement} editorDom - editor.view.dom
 * @param {string|HTMLElement|Window|null} userScrollContainer - 用户配置的滚动容器
 * @returns {HTMLElement|Window|null}
 */
export function resolveScrollContainer(editorDom, userScrollContainer) {
  if (typeof userScrollContainer === 'string') {
    const el = document.querySelector(userScrollContainer)
    if (el) return el
  } else if (userScrollContainer instanceof HTMLElement || userScrollContainer === window) {
    return userScrollContainer
  }

  // 降级回退到原有的向上查找逻辑
  return findScrollContainer(editorDom)
}

/**
 * 跳转到指定标题位置
 * @param {Object} editor Tiptap 编辑器实例
 * @param {string} headingId 标题的 ID
 * @param {Object} options 配置项
 * @param {boolean} options.smooth 是否平滑滚动，默认 true
 * @param {boolean} options.focus 是否聚焦到标题位置，默认 false
 * @param {string|HTMLElement|Window|null} options.scrollContainer 滚动容器（可选）
 */
export function scrollToHeading(editor, headingId, options = {}) {
  const { smooth = true, focus = false, scrollContainer: userScrollContainer } = options

  if (!editor || !headingId) return false

  const editorDom = editor.view.dom
  let element = null

  // 主策略：通过 ProseMirror pos 精确定位 DOM 节点
  // 从 toc storage 中获取 tocItems，其 pos 与 headingId 一一对应
  const tocStorage = editor.storage?.toc
  const tocItems = tocStorage?.tocItems || []
  const targetItem = tocItems.find(item => item.id === headingId)

  if (targetItem) {
    try {
      const node = editor.view.nodeDOM(targetItem.pos)
      if (node && node.nodeType === 1) {
        element = node
      }
    } catch (e) {
      // pos 可能越界，忽略
    }
  }

  // 回退策略 1：data-toc-id 属性
  if (!element) {
    element = editorDom.querySelector(`[data-toc-id="${headingId}"]`)
  }

  // 回退策略 2：id 属性
  if (!element) {
    try {
      element = editorDom.querySelector(`#${CSS.escape(headingId)}`)
    } catch (e) {
      // CSS.escape 异常，忽略
    }
  }

  if (!element) return false

  // 滚动容器解析：优先使用用户配置
  const container = resolveScrollContainer(editorDom, userScrollContainer)

  if (container) {
    const isWindow = container === window
    const containerRect = isWindow
      ? { top: 0, height: window.innerHeight }
      : container.getBoundingClientRect()
    const scrollTop = isWindow
      ? (window.scrollY || document.documentElement.scrollTop)
      : container.scrollTop
    const elementRect = element.getBoundingClientRect()
    const offsetTop = elementRect.top - containerRect.top + scrollTop

    const scrollTarget = isWindow ? window : container
    scrollTarget.scrollTo({
      top: offsetTop - 20, // 留一点顶部间距
      behavior: smooth ? 'smooth' : 'instant',
    })
  } else {
    element.scrollIntoView({
      behavior: smooth ? 'smooth' : 'instant',
      block: 'start',
    })
  }

  // 可选：聚焦编辑器并移动光标到标题位置
  if (focus) {
    // 优先使用已找到的 targetItem.pos
    let targetPos = targetItem ? targetItem.pos + 1 : null

    // 如果 targetItem 没找到，遍历文档查找
    if (targetPos === null) {
      editor.state.doc.descendants((node, pos) => {
        if (targetPos !== null) return false
        if (node.type.name === 'heading') {
          const text = node.textContent || ''
          const id = generateId(text)
          if (id === headingId || headingId.startsWith(id)) {
            targetPos = pos + 1
            return false
          }
        }
      })
    }

    if (targetPos !== null) {
      editor.commands.focus()
      editor.commands.setTextSelection(targetPos)
    }
  }

  return true
}

/**
 * 创建防抖函数
 * @param {Function} fn 要防抖的函数
 * @param {number} delay 延迟毫秒数
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
