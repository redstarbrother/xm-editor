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
      iconDirs: [path.resolve(__dirname, 'public/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
    }),
    VueDevTools(),
  ],
  build: {
    lib: {
      entry: 'src/index.js',  // 入口文件
      name: 'xm-editor',       // 库的名称
      fileName: (format) => `xm-editor.${format}.js`,  // 输出文件名
    },
    rollupOptions: {
      // 确保外部依赖不被打包
      external: ['vue'],
      output: {
        // 如果是 ES 模块，确保导出的格式正确
        globals: {
          vue: 'Vue', // Vue 库应该作为全局变量暴露
        },
      },
    },
    cssCodeSplit: false,
  },
})
