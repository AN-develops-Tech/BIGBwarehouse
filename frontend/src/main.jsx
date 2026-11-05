import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Whenever the user refreshes/reloads the page, return to the home page
try {
  const navEntries = window.performance?.getEntriesByType?.('navigation');
  const isReload = navEntries?.[0]?.type === 'reload' || window.performance?.navigation?.type === 1;
  if (isReload && window.location.pathname !== '/' && window.location.pathname !== '') {
    window.history.replaceState(null, '', '/');
  }
} catch {
  // Fallback
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
