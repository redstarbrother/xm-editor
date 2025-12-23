import { Table as TiptapTable } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import fixedConfig from "./fixed";
import slashConfig from "./slash";
import TableView from "@/components/extensions/nodes/table/TableView.vue";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

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
      fixed: fixedConfig,
      slash: slashConfig,
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
