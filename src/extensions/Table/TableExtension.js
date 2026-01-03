import { Table as TiptapTable } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import TableView from "./components/TableView.vue";

const TableExtension = TiptapTable.extend({
  addExtensions() {
    return [TableRow, TableCell, TableHeader];
  },

  addNodeView() {
    return VueNodeViewRenderer(TableView);
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

export default TableExtension;
