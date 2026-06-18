import { extractHeadings, scrollToHeading as scrollToHeadingUtil } from '@/extensions/Toc/tocUtils'

export function createEditorProxy(editor) {
  return {
    // ----- 常用方法 -----
    getHTML() {
      return editor.getHTML();
    },
    getJSON() {
      return editor.getJSON();
    },
    getText() {
      return editor.getText();
    },
    setContent(content) {
      editor.commands.setContent(content);
    },
    clear() {
      editor.commands.clearContent(true);
    },
    focus() {
      editor.commands.focus();
    },
    blur() {
      editor.commands.blur();
    },
    destroy() {
      editor.destroy();
    },

    // ----- 光标相关 -----
    getCursor() {
      return editor.state.selection;
    },

    // ----- 目录相关 -----
    /**
     * 获取目录控制器对象
     * @returns {{getTocInfo: Function, scrollToHeading: Function, setTitle: Function, changeTitle: Function}}
     */
    getToc() {
      return {
        /**
         * 获取当前文档的目录数据
         * @param {number[]} levels 需要提取的标题层级（默认 [1, 2, 3]）
         * @returns {Array<{id: string, level: number, text: string, pos: number}>}
         */
        getTocInfo(levels = [1, 2, 3]) {
          // 优先从 TOC extension 的 storage 中获取（实时同步的数据）
          const tocStorage = editor.storage?.toc || editor.extensionStorage?.toc;
          if (tocStorage && tocStorage.tocItems && tocStorage.tocItems.length > 0) {
            return tocStorage.tocItems;
          }
          // 降级：直接从文档中提取
          return extractHeadings(editor.state.doc, levels);
        },

        /**
         * 跳转到指定标题位置
         * @param {string} headingId 标题的 ID
         * @param {Object} options 配置项
         * @param {boolean} options.smooth 是否平滑滚动，默认 true
         * @param {boolean} options.focus 是否聚焦到标题位置，默认 false
         * @returns {boolean} 是否跳转成功
         */
        scrollToHeading(headingId, options = {}) {
          return scrollToHeadingUtil(editor, headingId, options);
        },

        /**
         * 修改目录面板标题
         * @param {string} newTitle 新的目录标题
         */
        setTitle(newTitle) {
          const tocStorage = editor.storage?.toc || editor.extensionStorage?.toc;
          if (tocStorage) {
            tocStorage.title = newTitle;
            // 派发一个轻量级 transaction 触发视图更新
            editor.view.dispatch(editor.state.tr);
          }
        },

        /**
         * 修改目录面板标题（setTitle的别名）
         * @param {string} newTitle 新的目录标题
         */
        changeTitle(newTitle) {
          this.setTitle(newTitle);
        }
      };
    },

    /**
     * 跳转到指定标题位置 (保留在顶层，以兼容旧版调用方式)
     * @param {string} headingId 标题的 ID
     * @param {Object} options 配置项
     * @param {boolean} options.smooth 是否平滑滚动，默认 true
     * @param {boolean} options.focus 是否聚焦到标题位置，默认 false
     * @returns {boolean} 是否跳转成功
     */
    scrollToHeading(headingId, options = {}) {
      return scrollToHeadingUtil(editor, headingId, options);
    },

    // ----- 原始实例（必要时）-----
    get instance() {
      return editor;
    }
  };
}

