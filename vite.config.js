import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        fingercode: resolve(__dirname, 'fingercode/index.html'),
        fingercodeSupport: resolve(__dirname, 'fingercode/support.html'),
        fingercodePrivacy: resolve(__dirname, 'fingercode/legal/privacy.html'),
        fingercodeTerms: resolve(__dirname, 'fingercode/legal/terms.html'),
        blog: resolve(__dirname, 'blog.html'),
      },
    },
  },
})
