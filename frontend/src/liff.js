import liff from '@line/liff'

const LIFF_ID = import.meta.env.VITE_LIFF_ID || ''

let _ready = false
let _initError = null

/**
 * Initialize LINE LIFF.
 * When opened outside LINE (no LIFF_ID or external browser): resolves without error,
 * getUserId() will return null until user logs in via liff.login().
 */
export async function initLiff() {
  if (_ready) return
  if (!LIFF_ID) {
    _ready = true
    return
  }
  try {
    await liff.init({ liffId: LIFF_ID })
  } catch (e) {
    _initError = e
    console.warn('LIFF init failed (opened outside LINE?):', e)
  }
  _ready = true
}

/**
 * Get LINE user ID from decoded ID token.
 * Returns null when:
 * - No LIFF_ID configured
 * - LIFF init failed (opened outside LINE)
 * - User not logged in
 */
export function getUserId() {
  if (!_ready || !LIFF_ID || _initError) return null
  try {
    if (!liff.isLoggedIn()) return null
    const token = liff.getDecodedIDToken()
    return token?.sub ?? null
  } catch {
    return null
  }
}

/** Whether the app is opened inside LINE client */
export function isInClient() {
  if (!LIFF_ID || _initError) return false
  try {
    return liff.isInClient()
  } catch {
    return false
  }
}

/** Whether LIFF is initialized and ready */
export function isReady() {
  return _ready
}
