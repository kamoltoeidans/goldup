import { useState, useEffect } from 'react'
import { useLiff } from '../contexts/LiffContext'
import { getAlerts, postAlert, deleteAlert } from '../services/api'

export default function Alert() {
  const { userId, ready } = useLiff()
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [targetPrice, setTargetPrice] = useState('')
  const [condition, setCondition] = useState('above')

  const load = () => {
    getAlerts()
      .then(setAlerts)
      .catch(() => setAlerts([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    const price = parseFloat(targetPrice)
    if (isNaN(price) || price <= 0) return
    try {
      await postAlert({ userId: userId || '', targetPrice: price, condition })
      setTargetPrice('')
      load()
    } catch (err) {
      console.error(err)
    }
  }

  const handleRemove = async (id) => {
    try {
      await deleteAlert(id)
      load()
    } catch (err) {
      console.error(err)
    }
  }

  const copyUserId = () => {
    if (userId) navigator.clipboard.writeText(userId)
  }

  return (
    <section>
      <h1 className="page-title">ตั้งค่าการแจ้งเตือน</h1>
      <p className="page-sub">แจ้งเตือนเมื่อราคาทองถึงระดับที่กำหนด</p>
      {ready && (
        <div className="card user-id-card">
          <p className="user-id-label">User ID</p>
          {userId ? (
            <>
              <code className="user-id-value">{userId}</code>
              <button type="button" onClick={copyUserId} className="btn btn-small btn-secondary">คัดลอก</button>
            </>
          ) : (
            <p className="page-sub">เปิดแอปผ่าน LINE เพื่อดู User ID</p>
          )}
        </div>
      )}
      <div className="card">
        <form onSubmit={handleAdd} className="form">
          <label>
            <span>ราคาเป้าหมาย (USD/ออนซ์)</span>
            <input type="number" step="0.01" value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)} placeholder="เช่น 2700" />
          </label>
          <label>
            <span>เงื่อนไข</span>
            <select value={condition} onChange={(e) => setCondition(e.target.value)}>
              <option value="above">แจ้งเตือนเมื่อราคาสูงขึ้นถึง</option>
              <option value="below">แจ้งเตือนเมื่อราคาต่ำลงถึง</option>
            </select>
          </label>
          <button type="submit" className="btn btn-primary" disabled={!targetPrice}>เพิ่มการแจ้งเตือน</button>
        </form>
      </div>
      {loading ? (
        <div className="card"><p>กำลังโหลด...</p></div>
      ) : alerts.length > 0 ? (
        <div className="card">
          <h3>รายการแจ้งเตือน ({alerts.length})</h3>
          <ul className="alert-list">
            {alerts.map((a) => (
              <li key={a.id} className="alert-item">
                <span>{a.condition === 'above' ? '↑' : '↓'} {a.targetPrice.toLocaleString('th-TH')} USD</span>
                <button type="button" onClick={() => handleRemove(a.id)} className="btn btn-small btn-danger">ลบ</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="page-sub">ยังไม่มีรายการแจ้งเตือน</p>
      )}
    </section>
  )
}
