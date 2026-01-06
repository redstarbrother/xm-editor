import { defineExtension } from '@/utils/extensionUtil'
import BubbleMenu from './components/BubbleMenu.vue'

export default defineExtension({
  name: 'bubble-menu',
  type: 'menu',
  extension: null,
  component: BubbleMenu
})
