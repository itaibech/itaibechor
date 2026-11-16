import { StrictMode, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Admin } from './Admin.tsx'
import { App } from './App.tsx'
import './styles.css'

// ponytail: hash route, no router lib; GitHub Pages has no SPA fallback.
function Root() {
  const [hash, setHash] = useState(location.hash)
  useEffect(() => {
    // Native View Transitions for page changes; browsers without it just swap instantly.
    const on = () => {
      if (!document.startViewTransition) return setHash(location.hash)
      document.startViewTransition(() => flushSync(() => setHash(location.hash)))
    }
    addEventListener('hashchange', on)
    return () => removeEventListener('hashchange', on)
  }, [])
  return hash.startsWith('#/admin') ? <Admin /> : <App page={hash.replace(/^#\/?/, '') || 'home'} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
