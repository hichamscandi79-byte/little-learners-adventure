import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { getMissingAudioMappings } from './data/validateContent.ts'

if (import.meta.env.DEV) {
  const missing = getMissingAudioMappings()
  if (missing.length > 0) {
    console.warn(`[content] ${missing.length} missing audio mapping(s):`, missing)
  } else {
    console.info('[content] all required audio mappings present')
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
