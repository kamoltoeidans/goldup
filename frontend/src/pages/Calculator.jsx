import { useState, useEffect } from 'react'
import { calcGoldPnL } from '../utils/goldCalc'
import { getPriceCurrent } from '../services/api'
import ResultBox from '../components/ResultBox'

export default function Calculator() {
  const [currentPrice, setCurrentPrice] = useState('')
  const [investment, setInvestment] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    getPriceCurrent()
      .then((d) => setCurrentPrice(String(d.xauUsd)))
      .catch(() => {})
  }, [])

  const handleCalc = (e) => {
    e.preventDefault()
    const curr = currentPrice || buyPrice
    const res = calcGoldPnL({ investment, buyPrice, currentPrice: curr })
    setResult(res)
  }

  const handleReset = () => {
    setInvestment('')
    setBuyPrice('')
    setResult(null)
  }

  return (
    <section>
      <h1 className="page-title">คำนวณกำไร/ขาดทุน</h1>
      <p className="page-sub">ลงทุนจำลอง (mock)</p>
      <div className="card">
        <form onSubmit={handleCalc} className="form">
          <label>
            <span>เงินลงทุน (USD)</span>
            <input type="number" step="0.01" value={investment} onChange={(e) => setInvestment(e.target.value)} placeholder="เช่น 2650" />
          </label>
          <label>
            <span>ราคาซื้อ (USD/ออนซ์)</span>
            <input type="number" step="0.01" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} placeholder="เช่น 2600" />
          </label>
          <label>
            <span>ราคาปัจจุบัน (USD/ออนซ์)</span>
            <input type="number" step="0.01" value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} placeholder="เช่น 2650" />
          </label>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">คำนวณ</button>
            <button type="button" onClick={handleReset} className="btn btn-secondary">ล้าง</button>
          </div>
        </form>
      </div>
      {result && <ResultBox result={result} />}
    </section>
  )
}
