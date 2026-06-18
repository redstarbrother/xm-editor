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
 * 跳转到指定标题位置
 * @param {Object} editor Tiptap 编辑器实例
 * @param {string} headingId 标题的 ID
 * @param {Object} options 配置项
 * @param {boolean} options.smooth 是否平滑滚动，默认 true
 * @param {boolean} options.focus 是否聚焦到标题位置，默认 false
 */
export function scrollToHeading(editor, headingId, options = {}) {
  const { smooth = true, focus = false } = options

  if (!editor || !headingId) return false

  // 优先使用 data-toc-id 查找（因为 ID 可能被去重处理）
  const editorDom = editor.view.dom
  let element = editorDom.querySelector(`[data-toc-id="${headingId}"]`)
  
  // 如果 data-toc-id 找不到，尝试 id 属性
  if (!element) {
    element = editorDom.querySelector(`#${CSS.escape(headingId)}`)
  }

  if (!element) return false

  // 获取编辑器内容区的可滚动容器
  const scrollContainer = findScrollContainer(editorDom)

  if (scrollContainer) {
    const containerRect = scrollContainer.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()
    const offsetTop = elementRect.top - containerRect.top + scrollContainer.scrollTop

    scrollContainer.scrollTo({
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
    // 在文档中查找对应的位置
    let targetPos = null
    editor.state.doc.descendants((node, pos) => {
      if (targetPos !== null) return false // 已找到，停止遍历
      if (node.type.name === 'heading') {
        const text = node.textContent || ''
        const id = generateId(text)
        if (id === headingId || headingId.startsWith(id)) {
          targetPos = pos + 1 // 光标放在标题文本开头
          return false
        }
      }
    })
    
    if (targetPos !== null) {
      editor.commands.focus()
      editor.commands.setTextSelection(targetPos)
    }
  }

  return true
}

/**
 * 查找最近的可滚动父容器
 * @param {HTMLElement} element 起始元素
 * @returns {HTMLElement|null}
 */
function findScrollContainer(element) {
  let parent = element.parentElement
  
  while (parent) {
    const style = window.getComputedStyle(parent)
    const overflow = style.overflow + style.overflowY
    
    if (/(auto|scroll)/.test(overflow)) {
      return parent
    }
    
    // 检查 editor-content 容器
    if (parent.classList.contains('editor-content')) {
      return parent
    }
    
    parent = parent.parentElement
  }
  
  return null
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
