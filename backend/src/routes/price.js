import { Router } from 'express'
import { getCurrentGoldPrice, getHistoricalGoldPrice, getHistoricalPriceList } from '../services/goldService.js'

const router = Router()

router.get('/current', async (_req, res) => {
  try {
    const data = await getCurrentGoldPrice()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gold price' })
  }
})

router.get('/history', async (req, res) => {
  try {
    const { date } = req.query
    if (date) {
      const data = await getHistoricalGoldPrice(date)
      res.json(data)
    } else {
      const list = await getHistoricalPriceList()
      res.json(list)
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch historical price' })
  }
})

export default router
