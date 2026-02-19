import { useState, useEffect } from 'react'
import { getPriceHistoryList } from '../services/api'
import { calcGoldPnL } from '../utils/goldCalc'
import ResultBox from '../components/ResultBox'

export default function History() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [amount, setAmount] = useState('1')
  const [result, setResult] = useState(null)

  useEffect(() => {
    getPriceHistoryList().then((data) => {
      setHistory(data)
      if (data.length) setSelectedDate((prev) => prev || data[0].date)
      setLoading(false)
    })
  }, [])

  const handleCalc = (e) => {
    e.preventDefault()
    const h = history.find((x) => x.date === selectedDate)
    if (!h) return
    const investment = Number(buyPrice) * Number(amount)
    const res = calcGoldPnL({ investment, buyPrice, currentPrice: h.price })
    setResult(res)
  }

  return (
    <section>
      <h1 className="page-title">วิเคราะห์ย้อนหลัง</h1>
      <p className="page-sub">สมมติว่าซื้อแล้วขายในวันที่เลือก</p>
      {loading ? (
        <div className="card"><p>กำลังโหลด...</p></div>
      ) : (
        <>
          <div className="card">
            <form onSubmit={handleCalc} className="form">
              <label>
                <span>วันที่</span>
                <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                  {history.map((h) => (
                    <option key={h.date} value={h.date}>{h.date} — {h.price.toLocaleString('th-TH')} USD</option>
                  ))}
                </select>
              </label>
              <label>
                <span>ราคาซื้อ (USD/ออนซ์)</span>
                <input type="number" step="0.01" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} placeholder="เช่น 2600" />
              </label>
              <label>
                <span>จำนวน (ออนซ์)</span>
                <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1" />
              </label>
              <button type="submit" className="btn btn-primary">คำนวณ</button>
            </form>
          </div>
          {result && <ResultBox result={result} />}
        </>
      )}
    </section>
  )
}
