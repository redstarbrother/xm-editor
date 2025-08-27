import { createApp, h } from "vue";
import SlashMenu from "@/components/core/menu/SlashMenu.vue";
import { useBubbleMenuPosition } from "@/components/core/menu/composables/useBubbleMenuPosition";

export default function renderSlashMenu() {
  let vueApp = null;
  let container = null;
  const { x, y, attachToRange } = useBubbleMenuPosition();

  return {
    onStart: (props) => {
      try {
        container = document.createElement("div");
        document.body.appendChild(container);
        
        if (props.clientRect && typeof props.clientRect === 'function') {
          attachToRange(props.clientRect());
        }

        vueApp = createApp({
          render() {
            return h(SlashMenu, {
              items: Array.isArray(props.items) ? props.items : [],
              command: props.command,
              editor: props.editor,
              range: props.range,
              style: {
                position: "absolute",
                top: y.value + "px",
                left: x.value + "px",
              },
            });
          },
        });
        vueApp.mount(container);
      } catch (error) {
        console.error("Error in slash menu onStart:", error);
      }
    },
    onUpdate: (props) => {
      try {
        if (props.clientRect && typeof props.clientRect === 'function') {
          attachToRange(props.clientRect());
        }
        
        if (vueApp && vueApp._instance && vueApp._instance.props) {
          vueApp._instance.props.items = Array.isArray(props.items) ? props.items : [];
        }
      } catch (error) {
        console.error("Error in slash menu onUpdate:", error);
      }
    },
    onKeyDown: (props) => false,
    onExit: () => {
      try {
        if (vueApp && typeof vueApp.unmount === 'function') {
          vueApp.unmount();
        }
        
        if (container && container.parentNode) {
          container.remove();
        }
      } catch (error) {
        console.error("Error in slash menu onExit:", error);
      }
    },
  };
}
