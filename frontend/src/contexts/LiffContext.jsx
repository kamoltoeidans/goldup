import { createContext, useContext, useState, useEffect } from 'react'
import { initLiff, getUserId } from '../liff'

const LiffContext = createContext({ userId: null, ready: false })

export function LiffProvider({ children }) {
  const [userId, setUserId] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initLiff().then(() => {
      const id = getUserId()
      setUserId(id)
      setReady(true)
      if (id) console.log('[LIFF] userId:', id)
      else console.log('[LIFF] userId: null')
    })
  }, [])

  const value = { userId, ready }
  return <LiffContext.Provider value={value}>{children}</LiffContext.Provider>
}

export function useLiff() {
  const ctx = useContext(LiffContext)
  if (!ctx) throw new Error('useLiff must be used within LiffProvider')
  return ctx
}
