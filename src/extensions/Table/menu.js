import { Table2 } from 'lucide-vue-next';
import SubMenuTable from "./components/SubMenu.vue";

export const fixedMenu = {
  icon: Table2,
  order: 130,
  label: "表格",
  isActive: ({ editor }) => editor.isActive('table'),
  shouldShow: ({ editor }) => editor.can().insertTable(),
  component: SubMenuTable,
  componentProps: {},
};

export const slashMenu = {
  id: "table",
  label: "表格",
  icon: Table2,
  action: ({ editor, range }) => {
     editor
      .chain()
      .focus()
      .deleteRange(range)
      .insertTable({
        rows: 3,
        cols: 3,
        withHeaderRow: false,
      })
      .run();
  },
};
