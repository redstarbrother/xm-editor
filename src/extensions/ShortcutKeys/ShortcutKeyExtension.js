import { Extension } from "@tiptap/core";
import GlobalTabExtension from "./GlobalTabExtension";

const ShortcutKeyExtension = Extension.create({
  name: "shortcutKey",
  priority: 1000, // 最高优先级

  addExtensions() {
    return [GlobalTabExtension];
  },

  addKeyboardShortcuts() {
    return {
      'Mod-a': ({ editor }) => {
        const { selection } = editor.state;
        const { $from } = selection;

        if ($from) {
          const depth = $from.depth;
          // 从最内层 block 向上查找未完全覆盖的祖先 block 节点
          for (let d = depth; d > 0; d--) {
            const node = $from.node(d);
            if (node.isBlock) {
              const start = $from.start(d);
              const end = $from.end(d);
              const isCovered = selection.from <= start && selection.to >= end;

              if (!isCovered) {
                // 如果没有完全覆盖，则将选区扩大到该 block 范围
                editor.commands.setTextSelection({ from: start, to: end });
                return true;
              }
            }
          }
        }

        // 如果所有祖先 block 都已被覆盖，或者不是文本选区，则直接全选整个文档
        editor.commands.selectAll();
        return true;
      },
    };
  },
});

export default ShortcutKeyExtension;
