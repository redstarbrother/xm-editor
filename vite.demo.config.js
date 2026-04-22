import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// Demo 站点构建配置（用于 GitHub Pages 部署）
export default defineConfig({
  base: '/xm-editor/',  // GitHub Pages 子路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@example': path.resolve(__dirname, 'examples'),
    },
  },
  plugins: [
    vue(),
  ],
  build: {
    outDir: 'dist-demo',
    emptyOutDir: true,
  },
})
