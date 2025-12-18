import TiptapBold from "@tiptap/extension-bold";
import { iconMap } from "@/components/setting/iconMap";
import UniversalButton from "@/components/buttons/base/UniversalButton.vue";

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
            execute: () => editor.chain().focus().toggleBold().run(),
          },
        };
      },
      bubble: {
        id: "bold",
        icon: "bold",
        label: "加粗",
        priority: 100,
        isActive: (editor) => editor.isActive("bold"),
        action: (editor) => editor.chain().focus().toggleBold().run(),
        shouldShow: (editor) =>
          !editor.state.selection.empty && editor.can().toggleBold(),
      },
    };
  },
});

export default Bold;
