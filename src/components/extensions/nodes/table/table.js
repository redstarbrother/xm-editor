import UniversalButton from "@/components/buttons/base/UniversalButton.vue";
// import { TableKit } from '@tiptap/extension-table'
import { Table as TiptapTable } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { iconMap } from "@/components/setting/iconMap";
import TableView from "@/components/extensions/nodes/table/TableView.vue";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

const name = "table";

const Table = TiptapTable.extend({
  addExtensions() {
    return [TableRow, TableCell, TableHeader];
  },

  addNodeView() {
    return VueNodeViewRenderer(TableView);
  },

  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap[name],
            isActive: () => editor.isActive(name),
            execute: () =>
              editor
                .chain()
                .focus()
                .insertTable({
                  rows: 3,
                  cols: 3,
                  withHeaderRow: false,
                })
                .run(),
            editor: editor,
          },
        };
      },
      slash: () => ({
        id: name,
        iconType: "svg",
        label: "表格",
        icon: iconMap[name],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertTable({
            rows: 3,
            cols: 3,
            withHeaderRow: false,
          }).run();
        },
      }),
    };
  },
  // ✨ 添加快捷键
  addKeyboardShortcuts() {
    return {
      "Alt-Enter": () => {
        return this.editor
          .chain()
          .focus()
          .addRowAfter() // 在当前行后面插入一行
          .run();
      },
    };
  },
});

export default Table;
