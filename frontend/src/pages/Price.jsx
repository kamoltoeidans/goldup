import { useState, useEffect } from 'react'
import { getPriceCurrent } from '../services/api'
import { fetchUsdThb } from '../services/priceService'
import PriceCard from '../components/PriceCard'

const xauToThbPerBaht = (xauUsd, usdThb) =>
  (xauUsd / 31.1035) * 15.244 * usdThb

export default function Price() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const [priceRes, usdThb] = await Promise.all([
        getPriceCurrent(),
        fetchUsdThb(),
      ])
      setData({
        xauUsd: priceRes.xauUsd,
        usdThb,
        thbPerBaht: xauToThbPerBaht(priceRes.xauUsd, usdThb),
      })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <section>
      <h1 className="page-title">ราคาทองคำ</h1>
      <p className="page-sub">XAU/USD และราคาทองบาท</p>
      <PriceCard data={data} loading={loading} error={error} onRefresh={load} />
    </section>
  )
}
