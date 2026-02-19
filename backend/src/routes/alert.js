import { Router } from 'express'
import { listAlerts, createAlert, deleteAlert } from '../services/goldService.js'

const router = Router()

router.get('/', async (_req, res) => {
  const alerts = await listAlerts()
  res.json(alerts)
})

router.post('/', async (req, res) => {
  try {
    const alert = await createAlert(req.body)
    res.status(201).json(alert)
  } catch (err) {
    res.status(400).json({ error: err.message || 'Invalid alert data' })
  }
})

router.delete('/:id', async (req, res) => {
  await deleteAlert(req.params.id)
  res.status(204).end()
})

export default router
