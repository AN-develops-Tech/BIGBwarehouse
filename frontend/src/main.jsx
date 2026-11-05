import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// On browser refresh, always redirect to Home page
try {
  const nav = window.performance && performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  const isReload = (nav && nav.type === 'reload') || (window.performance && performance.navigation && performance.navigation.type === 1);
  if (isReload && window.location.pathname !== '/') {
    window.history.replaceState(null, '', '/');
  }
} catch {}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
