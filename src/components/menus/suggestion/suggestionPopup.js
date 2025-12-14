// suggestion/suggestionPopup.js
import tippy from "tippy.js";
import SuggestionMenu from "./SuggestionMenu.vue";
import { createApp } from "vue";

export function createSuggestionPopup({
  editor,
  clientRect,
  items,
  command,
}) {
  const el = document.createElement("div");

  const app = createApp(SuggestionMenu, {
    items,
    command,
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
      vm.items = props.items;
      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    },

    onKeyDown({ event }) {
      return vm.onKeyDown(event);
    },

    destroy() {
      popup[0].destroy();
      app.unmount();
    },
  };
}
