import { Extension } from "@tiptap/core";

const SlashExtension = Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      ...this.parent?.(),
      items: [], // 默认空数组
    };
  },
});

export default SlashExtension;
