import TiptapImage from "@tiptap/extension-image";
import ImageButton from "@/components/menu/button/ImageButton.vue";
import ImageView from "@/components/extensions/image/ImageView.vue";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { Plugin } from "prosemirror-state";
import { iconMap } from '@/config/iconMap'

const Image = TiptapImage.extend({
  inline() {
    return true; // 让图片变成行内节点
  },

  group() {
    return "inline"; // 分组到 inline，允许插入段落内部
  },

  draggable: true,
  
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: ImageButton,
          componentProps: {
            icon: iconMap['image'],
            execute: () => {},
            editor,
          },
        };
      },
    };
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "300px",
      },
      height: {
        default: "auto",
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageView);
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste: (view, event) => {
            const items = Array.from(event.clipboardData?.items || []);
            const file = items
              .find((item) => item.type.indexOf("image") !== -1)
              ?.getAsFile();

            if (file) {
              const uploadUrl = this.options.uploadUrl;

              if (!uploadUrl) {
                console.warn("[xm-editor] uploadUrl not set");
                return false;
              }

              const formData = new FormData();
              formData.append("type", file.type);
              formData.append("file", file);

              fetch(uploadUrl, {
                method: "POST",
                body: formData,
              })
                .then((res) => res.json())
                .then((data) => {
                  const src = data.data?.url;
                  if (src) {
                    this.editor.chain().focus().setImage({ src }).run();
                  }
                });

              return true; // 阻止默认粘贴行为
            }

            return false;
          },
        },
      }),
    ];
  },
});

export default Image;
