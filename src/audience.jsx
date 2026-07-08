import React, { createContext, useContext, useEffect, useState } from 'react'

// Two "voices" for the whole guide: 'pro' (trader / finance framing) and
// 'teen' (12–16, everyday phone/gaming/school framing). The interactive widgets
// are identical for both — only the words and analogies change.
const AudienceContext = createContext(['pro', () => {}])
const KEY = 'ai-guide-audience-v1'

export function AudienceProvider({ children }) {
  const [mode, setMode] = useState('pro')
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved === 'pro' || saved === 'teen') setMode(saved)
    } catch {}
  }, [])
  function set(m) {
    setMode(m)
    try { localStorage.setItem(KEY, m) } catch {}
  }
  return (
    <AudienceContext.Provider value={[mode, set]}>{children}</AudienceContext.Provider>
  )
}

export function useAudience() {
  return useContext(AudienceContext)
}

// Render one of two nodes depending on the current audience.
// Usage: <Aud pro={<>trader words</>} teen={<>teen words</>} />
export function Aud({ pro, teen }) {
  const [mode] = useAudience()
  return <>{mode === 'teen' ? teen : pro}</>
}
