import { config } from '../config.js'

const MOCK_CURRENT = 2650.5
const MOCK_HISTORICAL = {
  '2025-02-18': 2650.5,
  '2025-02-17': 2642.3,
  '2025-02-14': 2635.8,
  '2025-02-13': 2648.2,
  '2025-02-12': 2630.1,
}

export async function fetchCurrentXauUsd() {
  if (!config.goldApiKey || !config.goldApiUrl) {
    return { xauUsd: MOCK_CURRENT, updatedAt: new Date().toISOString() }
  }
  try {
    const res = await fetch(`${config.goldApiUrl}/latest?base=USD&currencies=XAU`, {
      headers: config.goldApiKey ? { 'X-API-KEY': config.goldApiKey } : {},
    })
    if (!res.ok) throw new Error('Gold API error')
    const data = await res.json()
    const xauUsd = Number(data?.rates?.XAU ?? data?.xau ?? MOCK_CURRENT)
    return { xauUsd, updatedAt: new Date().toISOString() }
  } catch (err) {
    console.warn('Gold API failed, using mock:', err.message)
    return { xauUsd: MOCK_CURRENT, updatedAt: new Date().toISOString() }
  }
}

export async function fetchHistoricalXauUsd(date) {
  const d = date || new Date().toISOString().slice(0, 10)
  if (!config.goldApiKey || !config.goldApiUrl) {
    return { date: d, price: MOCK_HISTORICAL[d] ?? MOCK_CURRENT }
  }
  try {
    const res = await fetch(`${config.goldApiUrl}/historical?base=USD&date=${d}&currencies=XAU`, {
      headers: config.goldApiKey ? { 'X-API-KEY': config.goldApiKey } : {},
    })
    if (!res.ok) throw new Error('Gold API error')
    const data = await res.json()
    const price = Number(data?.rates?.XAU ?? data?.xau ?? MOCK_HISTORICAL[d] ?? MOCK_CURRENT)
    return { date: d, price }
  } catch (err) {
    console.warn('Gold API historical failed, using mock:', err.message)
    return { date: d, price: MOCK_HISTORICAL[d] ?? MOCK_CURRENT }
  }
}

export async function fetchHistoricalList() {
  return Object.entries(MOCK_HISTORICAL)
    .map(([date, price]) => ({ date, price }))
    .sort((a, b) => b.date.localeCompare(a.date))
}
