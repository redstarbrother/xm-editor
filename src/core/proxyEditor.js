import { extractHeadings, scrollToHeading as scrollToHeadingUtil } from '@/extensions/Toc/tocUtils'

export function createEditorProxy(editor, aiEngine) {
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

    // ----- 行高相关 -----
    /**
     * 实时设置选中文本的局部行高
     * @param {string|number} lineHeight 行高值，例如 '1.5', '2.0', '4.0'
     */
    setLineHeight(lineHeight) {
      editor.chain().focus().toggleTextStyle({ lineHeight }).run();
    },

    /**
     * 取消选中文本的局部行高
     */
    unsetLineHeight() {
      editor.chain().focus().unsetLineHeight().run();
    },

    /**
     * 实时设置编辑器的全局默认行高
     * @param {string|number} lineHeight 行高值
     */
    setGlobalLineHeight(lineHeight) {
      if (editor.view && editor.view.dom) {
        editor.view.dom.style.lineHeight = lineHeight;
      }
    },

    /**
     * 获取当前编辑器的全局默认行高
     * @returns {string}
     */
    getGlobalLineHeight() {
      return editor.view?.dom?.style?.lineHeight || '';
    },

    // ----- 字体相关 -----
    /**
     * 实时设置选中文本的局部字体
     * @param {string} fontFamily 字体名称，例如 'Arial', 'PingFang SC'
     */
    setFontFamily(fontFamily) {
      editor.chain().focus().setFontFamily(fontFamily).run();
    },

    /**
     * 取消选中文本的局部字体
     */
    unsetFontFamily() {
      editor.chain().focus().unsetFontFamily().run();
    },

    /**
     * 实时设置编辑器的全局默认字体
     * @param {string} fontFamily 字体名称
     */
    setGlobalFontFamily(fontFamily) {
      if (editor.view && editor.view.dom) {
        editor.view.dom.style.fontFamily = fontFamily;
      }
    },

    /**
     * 获取当前编辑器的全局默认字体
     * @returns {string}
     */
    getGlobalFontFamily() {
      return editor.view?.dom?.style?.fontFamily || '';
    },

    // ----- 目录相关 -----
    /**
     * 获取目录控制器对象
     */
    getToc() {
      const tocStorage = editor.storage?.toc || editor.extensionStorage?.toc;
      
      // 确保 listeners 数组存在以供订阅
      if (tocStorage && !tocStorage.listeners) {
        tocStorage.listeners = [];
        
        // 包装/拦截 options.onTocUpdate 回调，以通知所有订阅者
        const originalOnTocUpdate = tocStorage.options?.onTocUpdate;
        tocStorage.options = tocStorage.options || {};
        tocStorage.options.onTocUpdate = (items, activeId) => {
          originalOnTocUpdate?.(items, activeId);
          tocStorage.listeners.forEach(cb => {
            try {
              cb(items, activeId);
            } catch (e) {
              console.error('TOC subscription error:', e);
            }
          });
        };
      }

      return {
        /**
         * 获取当前文档的目录数据
         * @param {number[]} levels 需要提取的标题层级（默认 [1, 2, 3]）
         * @returns {Array<{id: string, level: number, text: string, pos: number}>}
         */
        getTocInfo(levels = [1, 2, 3]) {
          if (tocStorage && tocStorage.tocItems && tocStorage.tocItems.length > 0) {
            return tocStorage.tocItems;
          }
          // 降级：直接从文档中提取
          return extractHeadings(editor.state.doc, levels);
        },

        /**
         * 获取当前激活的标题 ID
         * @returns {string|null}
         */
        getActiveId() {
          return tocStorage?.activeId || null;
        },

        /**
         * 设置激活的标题 ID
         * @param {string} id 
         */
        setActiveId(id) {
          if (tocStorage?.highlighter) {
            tocStorage.highlighter.setActiveId(id);
          } else if (tocStorage) {
            tocStorage.activeId = id;
          }
        },

        /**
         * 订阅目录数据或激活 ID 发生变化
         * @param {Function} callback 
         */
        onUpdate(callback) {
          if (tocStorage && tocStorage.listeners) {
            tocStorage.listeners.push(callback);
          }
        },

        /**
         * 取消订阅
         * @param {Function} callback 
         */
        offUpdate(callback) {
          if (tocStorage && tocStorage.listeners) {
            const index = tocStorage.listeners.indexOf(callback);
            if (index !== -1) {
              tocStorage.listeners.splice(index, 1);
            }
          }
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
          const mergedOptions = {
            scrollContainer: tocStorage?.scrollContainer,
            ...options,
          };
          return scrollToHeadingUtil(editor, headingId, mergedOptions);
        },

        /**
         * 修改目录面板标题
         * @param {string} newTitle 新的目录标题
         */
        setTitle(newTitle) {
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

    // ----- AI 相关 -----
    ai: aiEngine ? {
      // 执行 AI 操作
      complete: (prompt) => aiEngine.executeAction('freePrompt', { instruction: prompt }),
      rewrite: () => aiEngine.executeAction('rewrite'),
      translate: (lang) => aiEngine.executeAction('translate', { targetLang: lang }),
      summarize: () => aiEngine.executeAction('summarize'),
      continueWriting: () => aiEngine.executeAction('continueWriting'),
      expand: () => aiEngine.executeAction('expand'),
      shorten: () => aiEngine.executeAction('shorten'),
      fixGrammar: () => aiEngine.executeAction('fixGrammar'),
      changeTone: (tone) => aiEngine.executeAction('changeTone', { tone }),

      // 自动补全控制
      completion: {
        enable: () => aiEngine.completionEngine?.enable(),
        disable: () => aiEngine.completionEngine?.disable(),
        get isEnabled() { return aiEngine.completionEngine?.isEnabled ?? false },
      },

      // 状态
      get isLoading() { return aiEngine.state.isLoading },
      get streamContent() { return aiEngine.state.streamContent },
      get error() { return aiEngine.state.error },
      abort: () => aiEngine.abort(),

      // 事件
      on: (event, callback) => aiEngine.on(event, callback),
      off: (event, callback) => aiEngine.off(event, callback),
    } : null,
  };
}
