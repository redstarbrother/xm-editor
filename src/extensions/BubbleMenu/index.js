import BubbleMenu from './components/BubbleMenu.vue'

export default {
  extension: null,
  manifest: {
    name: 'bubble-menu',
    title: 'Bubble Menu',
  },
  // 导出组件供 Core 层使用
  component: BubbleMenu
}
