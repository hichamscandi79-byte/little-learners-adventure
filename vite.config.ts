import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Only the GitHub Pages project-page build needs a subpath base; every
  // other build (dev server, the disposable preview artifact, any other
  // static host) keeps the default root base, unaffected by this.
  base: process.env.GH_PAGES ? '/little-learners-adventure/' : '/',
})
