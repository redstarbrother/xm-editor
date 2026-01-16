import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import VueDevTools from 'vite-plugin-vue-devtools'
import { viteStaticCopy } from 'vite-plugin-static-copy'

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
    VueDevTools(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/styles/editor.css',
          dest: '.',
          rename: 'xm-editor.css'
        },
        {
          src: 'src/styles/editor-notion.css',
          dest: '.',
          rename: 'xm-editor-notion.css'
        }
      ]
    })
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
        // 将 Vite 生成的 CSS 重命名为 style.css，避免与 copy 的 xm-editor.css 冲突
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'xm-editor.css') return 'style.css';
          return assetInfo.name;
        },
      },
    },
    cssCodeSplit: false,
  },
})
