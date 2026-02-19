import { Router } from 'express'

const router = Router()

router.post('/', (req, res) => {
  console.log('[Webhook] รับ request จาก LINE')
  res.status(200).end()
  const events = req.body?.events || []
  if (events.length === 0) {
    console.log('[Webhook] ไม่มี events (อาจเป็น verify จาก LINE)')
    return
  }
  for (const e of events) {
    const userId = e.source?.userId
    if (userId) {
      console.log('\n========== LINE User ID ==========')
      console.log('userId:', userId)
      console.log('==================================\n')
    } else {
      console.log('[Webhook] event ไม่มี userId:', JSON.stringify(e.source))
    }
  }
})

export default router
