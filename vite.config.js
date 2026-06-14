import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Inlines the built CSS into index.html as a <style> tag so the first paint
// doesn't wait on a separate render-blocking stylesheet request. The site has a
// single small stylesheet, so this is a net win for FCP/LCP.
function inlineCss() {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = Object.values(bundle).find((f) => f.fileName.endsWith('.html'))
      if (!html) return
      for (const file of Object.values(bundle)) {
        if (!file.fileName.endsWith('.css')) continue
        const base = file.fileName.split('/').pop()
        const linkTag = new RegExp(`<link[^>]*?href="[^"]*${base}"[^>]*?>`)
        if (linkTag.test(html.source)) {
          html.source = html.source.replace(linkTag, `<style>${file.source}</style>`)
          delete bundle[file.fileName]
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Relative base so built asset URLs work when hosted in a subfolder
  // (e.g. https://cheripic.com/partner/) instead of the domain root.
  base: './',
  plugins: [react(), inlineCss()],
  server: {
    port: 5500,
    open: true,
  },
})
