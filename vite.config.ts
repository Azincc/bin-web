import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import autoImportPlugin from '@opentiny/unplugin-tiny-vue' // 改为 /vite 以正确引入 Vite 专用版本
export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
    vueJsx(),
    vueDevTools(),
    autoImportPlugin('vite')
  ],
  define: {
    'process.env': { ...process.env }
  },
  resolve: {
    alias: [
      // XDesign 主题
      {
        find: /\@opentiny\/vue-theme\/(?!(infinity))/,
        replacement: '@opentiny/vue-theme/infinity-theme/'
      }
    ]
  }
})

