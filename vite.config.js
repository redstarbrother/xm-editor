import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import VueDevTools from 'vite-plugin-vue-devtools'
import fs from 'fs';

// 将组件内部的样式合并到 xm-editor.css、xm-editor-notion.css 中
const mergeStylesPlugin = () => {
  return {
    name: 'merge-styles',
    closeBundle: async () => {
      const distDir = path.resolve(__dirname, 'dist');
      const srcDir = path.resolve(__dirname, 'src/styles');
      
      // The generated component styles (configured via assetFileNames)
      const componentsCssPath = path.resolve(distDir, 'components.css');
      
      if (fs.existsSync(componentsCssPath)) {
        const componentsCss = fs.readFileSync(componentsCssPath, 'utf-8');
        
        // 1. Generate xm-editor.css (Base + Components)
        const baseCssPath = path.resolve(srcDir, 'xm-editor.css');
        if (fs.existsSync(baseCssPath)) {
          const baseCss = fs.readFileSync(baseCssPath, 'utf-8');
          fs.writeFileSync(path.resolve(distDir, 'xm-editor.css'), baseCss + '\n' + componentsCss);
          console.log('Generated dist/xm-editor.css');
        }
        
        // 2. Generate xm-editor-notion.css (Notion + Components)
        const notionCssPath = path.resolve(srcDir, 'xm-editor-notion.css');
        if (fs.existsSync(notionCssPath)) {
          const notionCss = fs.readFileSync(notionCssPath, 'utf-8');
          fs.writeFileSync(path.resolve(distDir, 'xm-editor-notion.css'), notionCss + '\n' + componentsCss);
          console.log('Generated dist/xm-editor-notion.css');
        }
        
        // 3. Generate xm-editor-feishu.css (Feishu + Components)
        const feishuCssPath = path.resolve(srcDir, 'xm-editor-feishu.css');
        if (fs.existsSync(feishuCssPath)) {
          const feishuCss = fs.readFileSync(feishuCssPath, 'utf-8');
          fs.writeFileSync(path.resolve(distDir, 'xm-editor-feishu.css'), feishuCss + '\n' + componentsCss);
          console.log('Generated dist/xm-editor-feishu.css');
        }
        
        // Optional: Remove components.css if you don't want to expose it
        // fs.unlinkSync(componentsCssPath);
      } else {
        console.warn('components.css not found in dist');
      }
    }
  }
}

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
    mergeStylesPlugin()
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
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) return 'components.css';
          return assetInfo.name;
        },
      },
    },
    cssCodeSplit: false,
  },
})
