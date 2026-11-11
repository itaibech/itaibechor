import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// CSP only in the build: the dev server injects inline scripts for hot reload.
const csp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https://github.com https://avatars.githubusercontent.com; connect-src https://hyeslwlewvvjiyizoduf.supabase.co; frame-src https://wwwtyro.github.io https://chvin.github.io https://ellisonleao.github.io https://kenrick95.github.io; base-uri 'self'; form-action 'self'"
const cspPlugin: Plugin = {
  name: 'csp',
  apply: 'build',
  transformIndexHtml: (html) => html.replace('<head>', `<head>\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`),
}

export default defineConfig({ base: '/itaibechor/', plugins: [react(), cspPlugin] })
