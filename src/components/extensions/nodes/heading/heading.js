import TtHeading from "@tiptap/extension-heading";
import HeadingButton from "@/components/buttons/custom/HeadingButton.vue";
import iconManager from "@/components/icon/iconManager";
import fixedConfig from "./fixed";

const name = "heading";

const Heading = TtHeading.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: HeadingButton,
          componentProps: {
            icon: iconManager.getIconComponent(name),
            isActive: () => editor.isActive(name),
            editor: editor,
          },
        };
      },
      fixed: fixedConfig,
      slash: () => [
        {
          id: "heading1",
          iconType: "svg",
          label: "一级标题",
          icon: iconManager.getIconComponent("heading1"),
          command: ({ editor, range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .toggleHeading({ level: 1 })
              .run();
          },
        },
        {
          id: "heading2",
          iconType: "svg",
          label: "二级标题",
          icon: iconManager.getIconComponent("heading2"),
          command: ({ editor, range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .toggleHeading({ level: 2 })
              .run();
          },
        },
        {
          id: "heading3",
          iconType: "svg",
          label: "三级标题",
          icon: iconManager.getIconComponent("heading3"),
          command: ({ editor, range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .toggleHeading({ level: 3 })
              .run();
          },
        },
      ],
    };
  },
});

export default Heading;
