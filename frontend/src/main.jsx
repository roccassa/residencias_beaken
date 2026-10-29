import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { iniciarAnimaciones } from './utils/animaciones'

// Antes de pintar: así los bloques que aparecen al hacer scroll nacen ocultos y no parpadean
iniciarAnimaciones()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
