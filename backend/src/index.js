import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import cron from 'node-cron'
import priceRouter from './routes/price.js'
import alertRouter from './routes/alert.js'
import debugRouter from './routes/debug.js'
import webhookRouter from './routes/webhook.js'
import { runAlertJob } from './cron/alertJob.js'
import { config } from './config.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/price', priceRouter)
app.use('/api/alert', alertRouter)
app.use('/debug', debugRouter)
app.use('/webhook', webhookRouter)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(config.port, () => {
  console.log(`Backend listening on http://localhost:${config.port}`)
  console.log('LINE push:', config.lineChannelAccessToken ? 'enabled' : 'disabled (no token)')
  console.log('Webhook: ต้องใช้ ngrok เพื่อให้ LINE ส่ง event มาได้ (localhost ใช้ไม่ได้)')
})

cron.schedule('*/5 * * * *', runAlertJob)
console.log('Cron: alert job every 5 minutes')
