import { Extension } from "@tiptap/core";
import GlobalTabExtension from "./GlobalTabExtension";

const ShortcutKeyExtension = Extension.create({
  name: "shortcutKey",
  addExtensions() {
    return [GlobalTabExtension];
  },
});

export default ShortcutKeyExtension;
