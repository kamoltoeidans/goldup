const BASE_URL = import.meta.env.VITE_API_URL || '/api'

function request(path, options = {}) {
  const url = `${BASE_URL}${path}`
  return fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
}

export async function getPriceCurrent() {
  const res = await request('/price/current')
  if (!res.ok) throw new Error('โหลดราคาปัจจุบันไม่สำเร็จ')
  return res.json()
}

export async function getPriceHistory(date) {
  const params = date ? `?date=${encodeURIComponent(date)}` : ''
  const res = await request(`/price/history${params}`)
  if (!res.ok) throw new Error('โหลดประวัติราคาไม่สำเร็จ')
  return res.json()
}

export async function getPriceHistoryList() {
  const res = await request('/price/history')
  if (!res.ok) throw new Error('โหลดประวัติราคาไม่สำเร็จ')
  return res.json()
}

export async function getAlerts() {
  const res = await request('/alert')
  if (!res.ok) throw new Error('โหลดการแจ้งเตือนไม่สำเร็จ')
  return res.json()
}

export async function postAlert(body) {
  const res = await request('/alert', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('บันทึกการแจ้งเตือนไม่สำเร็จ')
  return res.json()
}

export async function deleteAlert(id) {
  const res = await request(`/alert/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('ลบการแจ้งเตือนไม่สำเร็จ')
}
