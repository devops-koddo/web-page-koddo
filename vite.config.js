import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mainEn: resolve(__dirname, 'en/index.html'),
        fingercode: resolve(__dirname, 'fingercode/index.html'),
        fingercodeSupport: resolve(__dirname, 'fingercode/support.html'),
        fingercodePrivacy: resolve(__dirname, 'fingercode/legal/privacy.html'),
        fingercodeTerms: resolve(__dirname, 'fingercode/legal/terms.html'),
        fingercodeEs: resolve(__dirname, 'fingercode/es/index.html'),
        fingercodeEsSupport: resolve(__dirname, 'fingercode/es/support.html'),
        fingercodeEsPrivacy: resolve(__dirname, 'fingercode/es/legal/privacy.html'),
        fingercodeEsTerms: resolve(__dirname, 'fingercode/es/legal/terms.html'),
        nothinpp: resolve(__dirname, 'nothinpp/index.html'),
        nothinppSupport: resolve(__dirname, 'nothinpp/support.html'),
        nothinppPrivacy: resolve(__dirname, 'nothinpp/legal/privacy.html'),
        nothinppTerms: resolve(__dirname, 'nothinpp/legal/terms.html'),
        nothinppEs: resolve(__dirname, 'nothinpp/es/index.html'),
        nothinppEsSupport: resolve(__dirname, 'nothinpp/es/support.html'),
        nothinppEsPrivacy: resolve(__dirname, 'nothinpp/es/legal/privacy.html'),
        nothinppEsTerms: resolve(__dirname, 'nothinpp/es/legal/terms.html'),
        blog: resolve(__dirname, 'blog.html'),
        blogErpMitad: resolve(__dirname, 'blog/por-que-tu-erp-se-usa-a-la-mitad/index.html'),
        blogMejorarProcesos: resolve(__dirname, 'blog/como-mejorar-procesos-empresa-sin-cambiar-sistema/index.html'),
        blogTiInterno: resolve(__dirname, 'blog/ti-interno-o-partner-tecnologico/index.html'),
        blogConstruirEmpresa: resolve(__dirname, 'blog/como-construir-empresa-estos-dias/index.html'),
        onePager: resolve(__dirname, 'one-pager/index.html'),
      },
    },
  },
})
