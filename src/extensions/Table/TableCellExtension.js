import { TableCell } from '@tiptap/extension-table-cell'

/**
 * 自定义 TableCell 扩展
 * 在原有 TableCell 基础上注册 backgroundColor 自定义属性，
 * 使得可以通过 setCellAttribute('backgroundColor', color) 设置单元格背景色
 */
const TableCellExtension = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-background-color') || element.style.backgroundColor || null,
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) {
            return {}
          }
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
    }
  },
})

export default TableCellExtension
