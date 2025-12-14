// suggestion/suggestionPopup.js
import tippy from "tippy.js";
import SuggestionMenu from "./SuggestionMenu.vue";
import { createApp, h, reactive } from "vue";

export function createSuggestionPopup({
  editor,
  clientRect,
  items,
  command,
}) {
  const el = document.createElement("div");
  const state = reactive({
    items,
    command,
  });

  const app = createApp({
    render() {
      return h(SuggestionMenu, {
        items: state.items,
        command: state.command,
        ref: 'menu'
      });
    }
  });

  const vm = app.mount(el);

  const popup = tippy("body", {
    getReferenceClientRect: clientRect,
    appendTo: () => document.body,
    content: el,
    showOnCreate: true,
    interactive: true,
    trigger: "manual",
    placement: "bottom-start",
  });

  return {
    update(props) {
      state.items = props.items;
      if (props.command) {
        state.command = props.command;
      }
      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    },

    onKeyDown({ event }) {
      if (event.key === 'Escape') {
        popup[0].hide();
        return true;
      }
      return vm.$refs.menu?.onKeyDown(event);
    },

    destroy() {
      popup[0].destroy();
      app.unmount();
    },
  };
}
