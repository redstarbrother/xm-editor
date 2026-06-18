import { defineExtension } from '@/utils/extensionUtil'
import TocExtension from './TocExtension'
import TocPanel from './components/TocPanel.vue'

/**
 * TOC 目录扩展
 * 
 * 支持两种模式：
 * - 'panel'（默认）：在编辑器中显示内置目录面板
 * - 'data'：仅提供目录数据，不渲染 UI（滚动高亮检测仍会运行）
 * 
 * 使用方式：
 * 
 * // 模式 A：内置面板
 * Extensions.Toc
 * 
 * // 模式 B：自定义渲染
 * Extensions.Toc.configure({
 *   mode: 'data',
 *   levels: [1, 2, 3],
 *   onTocUpdate: (tocItems, activeId) => {
 *     // tocItems: 标题列表 [{id, level, text, pos}, ...]
 *     // activeId: 当前滚动激活的标题 ID
 *   },
 * })
 * 
 * // 也可以随时从 editor.storage.toc 读取：
 * // editor.storage.toc.tocItems  → 标题列表
 * // editor.storage.toc.activeId  → 当前激活的标题 ID
 */
export default defineExtension({
  name: 'toc',
  type: 'panel',
  extension: TocExtension,
  component: TocPanel,
  // 用于传递给 TocPanel 的配置（在 ExtensionManager 中会被读取）
  tocOptions: {
    mode: 'panel',
    position: 'right',
    collapsed: false,
    title: '目录',
    levels: [1, 2, 3, 4, 5, 6],
    highlightOnScroll: true,
    debounce: 300,
  },
  // 重写 configure 方法以支持 TOC 特有的配置
  configure(options = {}) {
    const mergedTocOptions = {
      ...this.tocOptions,
      ...options,
    }

    // 如果 mode 是 'data'，不注册 component
    const component = mergedTocOptions.mode === 'data' ? null : TocPanel

    return {
      ...this,
      component,
      tocOptions: mergedTocOptions,
      extension: TocExtension.configure({
        ...mergedTocOptions,
        onTocUpdate: options.onTocUpdate || null,
      }),
    }
  },
})
