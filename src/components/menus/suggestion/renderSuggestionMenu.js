import { VueRenderer } from "@tiptap/vue-3";
import SlashMenu from "@/components/menus/slash/SlashMenu.vue";

export default function renderSlashMenu() {
  let component = null; // 👈 保存 SlashMenu 实例
  let positionStyle = {};

  return {
    onStart: (props) => {
      try {
        positionStyle = generatePositionStyle(props.clientRect());
        console.log("props.items: ", props.items);
        props.positionStyle = positionStyle;

        component = new VueRenderer(SlashMenu, {
          props,
          editor: props.editor,
        });

        document.body.appendChild(component.element);
      } catch (error) {
        console.error("Error in slash menu onStart:", error);
      }
    },

    onUpdate: (props) => {
      try {
        props.positionStyle = generatePositionStyle(props.clientRect());
        component.updateProps(props);
      } catch (error) {
        console.error("Error in slash menu onUpdate:", error);
      }
    },

    onKeyDown: (props) => {
      try {
        if (props.event.key === "Escape") {
          document.body.removeChild(component.element);
          component.destroy();

          return true;
        }
        return component.ref?.onKeyDown(props);
      } catch (error) {
        console.error("Error in slash menu onKeyDown:", error);
      }
    },

    onExit: () => {
      try {
        if (document.body.contains(component.element)) {
          document.body.removeChild(component.element);
        }
        component.destroy();
      } catch (error) {
        console.error("Error in slash menu onExit:", error);
      }
    },
  };
}

const generatePositionStyle = (clientRect) => {
  if (!clientRect) {
    return {};
  }

  return {
    position: "absolute",
    top: clientRect.bottom + "px",
    left: clientRect.left + "px",
  };
};
