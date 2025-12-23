import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, all } from "lowlight";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import CodeBlockComponent from "./CodeBlockComponent.vue";
import filedConfig from "./fixed.js";
import slashConfig from "./slash.js";

const lowlight = createLowlight(all);

const CodeBlock = CodeBlockLowlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      fixed: filedConfig,
      slash: slashConfig,
    };
  },
  addNodeView() {
    return VueNodeViewRenderer(CodeBlockComponent);
  },
}).configure({ lowlight, defaultLanguage: null });

export default CodeBlock;
