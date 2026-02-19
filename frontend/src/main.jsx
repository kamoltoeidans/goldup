import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LiffProvider } from './contexts/LiffContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LiffProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LiffProvider>
  </StrictMode>,
)
