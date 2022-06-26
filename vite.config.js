/*
 * @Date: 2022-06-21 10:57:35
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-24 17:10:58
 * @FilePath: /shopify-management/vite.config.js
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'

const srcPath = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 添加下面这块
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  resolve: {
    alias: {
      '@/': `${srcPath}/`,
      'comp/': `${srcPath}/components/`,
      'pages/': `${srcPath}/pages/`,
      'sass/': `${srcPath}/common/sass/`
    }
  },
  server: {
    open: true
  }
})
