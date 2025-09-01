import TiptapImage from "@tiptap/extension-image";
import ImageButton from "@/components/buttons/custom/ImageButton.vue";
import ImageView from "./ImageView.vue";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { Plugin } from "prosemirror-state";
import { iconMap } from "@/components/setting/iconMap";

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
      /**
       * 用户必须传入的上传处理函数
       * @param file File对象
       * @returns Promise<{ url: string }>
       */
      uploadHandler: null,
      button({ editor }) {
        return {
          component: ImageButton,
          componentProps: {
            icon: iconMap["image"],
            isActive: () => {},
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
          // 粘贴上传
          handlePaste: (view, event) => {
            const items = Array.from(event.clipboardData?.items || []);
            const file = items
              .find((i) => i.type.indexOf("image") !== -1)
              ?.getAsFile();

            if (file) {
              const handler = this.options.uploadHandler;
              if (!handler || typeof handler !== "function") {
                console.warn("[xm-editor] uploadHandler not set");
                return false;
              }

              handler(file)
                .then(({ url }) => {
                  if (url) {
                    this.editor.chain().focus().setImage({ src: url }).run();
                  }
                })
                .catch((err) => {
                  console.error("[xm-editor] image upload failed", err);
                });

              return true; // 阻止默认粘贴行为
            }
            return false;
          },
          // 拖拽上传
          handleDrop: (view, event) => {
            const files = Array.from(event.dataTransfer?.files || []);
            const image = files.find((file) => /image/i.test(file.type));

            if (image) {
              const handler = this.options.uploadHandler;
              if (!handler || typeof handler !== "function") {
                console.warn("[xm-editor] uploadHandler not set");
                return false;
              }

              handler(image)
                .then(({ url }) => {
                  if (url) {
                    const { schema } = view.state;
                    const coords = view.posAtCoords({
                      left: event.clientX,
                      top: event.clientY,
                    });
                    if (coords) {
                      const node = schema.nodes.image.create({ src: url });
                      const transaction = view.state.tr.insert(
                        coords.pos,
                        node
                      );
                      view.dispatch(transaction);
                    }
                  }
                })
                .catch((err) => {
                  console.error("[xm-editor] image drop upload failed", err);
                });

              return true; // 阻止默认drop行为
            }
            return false;
          },
        },
      }),
    ];
  },
});

export default Image;
