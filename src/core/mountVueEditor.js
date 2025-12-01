import { createApp, h } from 'vue'
import VueEditor from '@/components/XmEditorComponent.vue'

export function mountVueEditor({ el, props }) {
  const app = createApp(VueEditor, props);
  const vm = app.mount(el);

  return vm;
}
