import { getCurrentGoldPrice, listAlerts } from '../services/goldService.js'
import { pushLineMessage } from '../services/lineService.js'

const triggered = new Set()

export async function runAlertJob() {
  try {
    const { xauUsd } = await getCurrentGoldPrice()
    const alerts = await listAlerts()
    for (const a of alerts) {
      if (!a.userId) continue
      const hit = a.condition === 'above' ? xauUsd >= a.targetPrice : xauUsd <= a.targetPrice
      if (!hit) continue
      const key = `${a.id}-${a.targetPrice}`
      if (triggered.has(key)) continue
      triggered.add(key)
      const msg = `🔔 แจ้งเตือนทองคำ: ราคา ${xauUsd.toLocaleString()} USD/ออนซ์ ${a.condition === 'above' ? 'สูงขึ้นถึง' : 'ต่ำลงถึง'} ${a.targetPrice.toLocaleString()} USD แล้ว`
      await pushLineMessage(a.userId, msg)
    }
  } catch (err) {
    console.error('alertJob error:', err.message)
  }
}
