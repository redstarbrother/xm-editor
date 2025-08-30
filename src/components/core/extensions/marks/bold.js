import TiptapBold from "@tiptap/extension-bold";
import { iconMap } from "@/components/setting/iconMap";
import UniversalButton from "@/components/core/menu/button/UniversalButton.vue";

const name = "bold";

const Bold = TiptapBold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap[name],
            isActive: () => editor.isActive(name),
            execute: () => editor.commands.toggleBold(),
          },
        };
      },
      slash: () => ({
        label: "加粗",
        icon: iconMap[name],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setBold().run();
        },
      }),
    };
  },
});

export default Bold;
