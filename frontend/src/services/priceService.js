// Mock gold price + real USD/THB from Frankfurter
const XAU_USD_MOCK = 2650.5
const MOCK_USD_THB = 36.5

const xauToThbPerBaht = (xauUsd, usdThb) => {
  return (xauUsd / 31.1035) * 15.244 * usdThb
}

export async function fetchUsdThb() {
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=THB')
    if (!res.ok) return MOCK_USD_THB
    const data = await res.json()
    return data.rates?.THB ?? MOCK_USD_THB
  } catch {
    return MOCK_USD_THB
  }
}

export async function fetchPriceData() {
  const usdThb = await fetchUsdThb()
  const xauUsd = XAU_USD_MOCK
  return {
    xauUsd,
    usdThb,
    thbPerBaht: xauToThbPerBaht(xauUsd, usdThb),
  }
}

export const MOCK_HISTORICAL = [
  { date: '2025-02-18', price: 2650.5 },
  { date: '2025-02-17', price: 2642.3 },
  { date: '2025-02-14', price: 2635.8 },
  { date: '2025-02-13', price: 2648.2 },
  { date: '2025-02-12', price: 2630.1 },
]

export async function fetchHistoricalPrices() {
  return [...MOCK_HISTORICAL]
}
