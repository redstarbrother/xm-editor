import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import VueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  // root: path.resolve(__dirname, 'examples'),
  resolve: {
    /**
     * 配置目录别名
     */
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@example': path.resolve(__dirname, 'examples'),
    },
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的svg图标文件目录
      iconDirs: [path.resolve(__dirname, 'svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    VueDevTools(),
  ],
})
