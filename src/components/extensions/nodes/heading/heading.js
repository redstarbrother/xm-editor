import TtHeading from "@tiptap/extension-heading";
import HeadingButton from "@/components/buttons/custom/HeadingButton.vue";
import { iconMap } from "@/components/setting/iconMap";

const name = "heading";

const Heading = TtHeading.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: HeadingButton,
          componentProps: {
            icon: iconMap[name],
            isActive: () => editor.isActive(name),
            editor: editor,
          },
        };
      },
      slash: () => [
        {
          label: "一级标题",
          icon: iconMap["heading1"],
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
          label: "二级标题",
          icon: iconMap["heading2"],
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
          label: "三级标题",
          icon: iconMap["heading3"],
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
