import { Router } from 'express'
import { pushLineMessage } from '../services/lineService.js'

const router = Router()
const TEST_MESSAGE = '🚨 TEST ALERT: ระบบแจ้งเตือนใช้งานได้แล้ว'

router.get('/', (_req, res) => {
  res.json({
    message: 'Debug endpoints available',
    endpoints: [{ method: 'POST', path: '/debug/trigger-alert', body: { userId: 'string' } }],
  })
})

router.post('/trigger-alert', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Debug endpoint disabled in production' })
  }
  const raw = req.body?.userId
  const userId = typeof raw === 'string' ? raw.trim() : String(raw || '').trim()
  if (!userId || !userId.startsWith('U') || userId.length < 10) {
    return res.status(400).json({
      error: 'userId ต้องเป็น LINE User ID จริง (ขึ้นต้นด้วย U, ยาวอย่างน้อย 10 ตัว)',
      example: 'U1234567890abcdef1234567890abcd',
    })
  }
  try {
    await pushLineMessage(userId, TEST_MESSAGE)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

export default router
