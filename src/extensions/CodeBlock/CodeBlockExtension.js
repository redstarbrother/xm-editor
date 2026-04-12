import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, all } from "lowlight";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import CodeBlockComponent from "./components/CodeBlockComponent.vue";

const lowlight = createLowlight(all);

const CodeBlockExtension = CodeBlockLowlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'xm-code-block',
      },
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(CodeBlockComponent);
  },
}).configure({ lowlight, defaultLanguage: null });

export default CodeBlockExtension;
