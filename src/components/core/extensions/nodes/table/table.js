import { Extension } from "@tiptap/core";
import UniversalButton from '@/components/core/menu/button/UniversalButton.vue'
import { TableKit } from '@tiptap/extension-table'
import { iconMap } from "@/components/setting/iconMap";

const Table = Extension.create({
  name: "table",
  addExtensions() {
    return [
      TableKit
    ];
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
            execute: () => editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: false }),
            editor: editor,
          },
        };
      },
    };
  },
});


export default Table;
