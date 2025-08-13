import UniversalButton from "@/components/core/menu/button/UniversalButton.vue";
// import { TableKit } from '@tiptap/extension-table'
import { Table as TiptapTable } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { iconMap } from "@/components/setting/iconMap";
import TableView from "@/components/core/extensions/nodes/table/TableView.vue";
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
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap["table"],
            isActive: () => editor.isActive("table"),
            execute: () =>
              editor.commands.insertTable({
                rows: 3,
                cols: 3,
                withHeaderRow: false,
              }),
            editor: editor,
          },
        };
      },
    };
  },
});

export default Table;
