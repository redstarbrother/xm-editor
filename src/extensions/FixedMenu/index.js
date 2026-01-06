import { defineExtension } from '@/utils/extensionUtil'
import FixedMenu from './components/FixedMenu.vue'

export default defineExtension({
  name: 'fixed-menu',
  type: 'menu',
  extension: null,
  component: FixedMenu
})
