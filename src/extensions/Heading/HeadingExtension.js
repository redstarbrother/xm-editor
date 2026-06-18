import TiptapHeading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

/**
 * 根据标题文本生成 slug ID（用于目录导航锚点）
 * @param {string} text 标题文本
 * @returns {string} slug 格式的 ID
 */
function generateHeadingSlug(text) {
  if (!text) return '';
  return 'heading-' + text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '') // 保留中文、字母、数字、连字符
}

const HeadingExtension = TiptapHeading.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'xm-heading',
      },
    }
  },
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level)
    const level = hasLevel
      ? node.attrs.level
      : this.options.levels[0]

    const text = node.textContent || ''
    const tocId = generateHeadingSlug(text)

    return [`h${level}`, mergeAttributes(
      this.options.HTMLAttributes,
      HTMLAttributes,
      {
        class: `xm-h${level}`,
        'data-toc-id': tocId,
        id: tocId,
      }
    ), 0]
  },
});

export default HeadingExtension;
