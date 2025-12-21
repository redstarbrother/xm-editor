import TiptapBold from "@tiptap/extension-bold";
import bubbleConfig from "./bubble";
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
      bubble: bubbleConfig,
    };
  },
});

export default Bold;
