export default function PriceCard({ data, loading, error, onRefresh }) {
  if (loading) return <div className="card"><p>กำลังโหลด...</p></div>
  if (error) return <div className="card"><p className="text-error">{error}</p></div>
  if (!data) return null
  return (
    <div className="card">
      <div className="price-block">
        <p className="price-label">XAU/USD</p>
        <p className="price-value">{data.xauUsd.toLocaleString('th-TH')}</p>
        <p className="price-unit">USD/ออนซ์</p>
      </div>
      <div className="price-block">
        <p className="price-label">ราคาทองบาท</p>
        <p className="price-value price-thb">{Math.round(data.thbPerBaht).toLocaleString('th-TH')}</p>
        <p className="price-unit">บาท/น้ำหนัก 1 บาท</p>
      </div>
      <p className="price-meta">อัตรา USD/THB: {data.usdThb.toLocaleString('th-TH')}</p>
      <button type="button" onClick={onRefresh} className="btn btn-secondary">โหลดใหม่</button>
    </div>
  )
}
