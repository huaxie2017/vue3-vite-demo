
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')


export default defineConfig({
  resolve: {
    // 类型：Record<string, string> | Array<{ find: string | RegExp, replacement: string }> 将会被传递到 @rollup/plugin-alias 作为它的 entries。
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'] // 类型： string[] 导入时想要省略的扩展名列表。
  },
  plugins: [vue()],
  server: {
    port: 5000,
    open: true,
    cors: true,
    // 本地开发配置代理 跨域
    proxy: {
      '/api': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>path.replace('/api','')
      }
    }
  }
})
