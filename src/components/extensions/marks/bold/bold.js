import TiptapBold from "@tiptap/extension-bold";
import bubbleConfig from "./bubble";
import fixedConfig from "./fixed";
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
      fixed: fixedConfig,
      bubble: bubbleConfig,
    };
  },
});

export default Bold;
