const alerts = []

export function listAlerts() {
  return [...alerts]
}

export function createAlert({ userId, targetPrice, condition }) {
  const alert = {
    id: String(Date.now()),
    userId: String(userId || ''),
    targetPrice: Number(targetPrice),
    condition: condition === 'below' ? 'below' : 'above',
    createdAt: new Date().toISOString(),
  }
  alerts.push(alert)
  return alert
}

export function deleteAlert(id) {
  const i = alerts.findIndex((a) => a.id === String(id))
  if (i >= 0) alerts.splice(i, 1)
}
