export default function ResultBox({ result }) {
  const isProfit = result.profit >= 0
  return (
    <div className={`card result ${isProfit ? 'profit' : 'loss'}`}>
      <h3>ผลลัพธ์</h3>
      <div className="result-row">
        <span>มูลค่าปัจจุบัน</span>
        <strong>{result.currentValue.toLocaleString('th-TH', { minimumFractionDigits: 2 })} USD</strong>
      </div>
      <div className="result-row result-value">
        <span>{isProfit ? 'กำไร' : 'ขาดทุน'}</span>
        <strong>{Math.abs(result.profit).toLocaleString('th-TH', { minimumFractionDigits: 2 })} USD</strong>
      </div>
      <div className="result-row">
        <span>ROI</span>
        <strong>{(result.roi >= 0 ? '+' : '')}{result.roi.toFixed(2)}%</strong>
      </div>
      <p className="result-meta">จำนวนทอง: {result.units.toFixed(4)} ออนซ์</p>
    </div>
  )
}
