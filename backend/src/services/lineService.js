import { config } from '../config.js'

export async function pushLineMessage(userId, text) {
  if (!config.lineChannelAccessToken) {
    console.warn('LINE_CHANNEL_ACCESS_TOKEN not set, skip push')
    return
  }
  try {
    const res = await fetch(config.linePushUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.lineChannelAccessToken}`,
      },
      body: JSON.stringify({
        to: String(userId).trim(),
        messages: [{ type: 'text', text }],
      }),
    })
    const body = await res.text()
    if (!res.ok) {
      console.error('LINE API error:', res.status, body)
      throw new Error(`LINE push failed: ${res.status} ${body}`)
    }
    console.log('LINE push accepted for userId:', userId)
  } catch (e) {
    console.error('pushLineMessage error:', e.message)
    throw e
  }
}
