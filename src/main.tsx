import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { getMissingAudioMappings } from './data/validateContent.ts'
import { preloadTemporaryTone } from './audio/audioManifest.ts'

preloadTemporaryTone()

if (import.meta.env.DEV) {
  const missing = getMissingAudioMappings()
  if (missing.length > 0) {
    console.warn(`[content] ${missing.length} missing audio mapping(s):`, missing)
  } else {
    console.info('[content] all required audio mappings present')
  }
}

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      // Offline install/caching is a nice-to-have — the app itself doesn't depend on it.
    })
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
