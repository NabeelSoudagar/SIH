import express from 'express'
import { getMedicines, getStores, placeOrder } from '../controllers/pharmacy.controller.js'

const router = express.Router()

router.get('/medicines', getMedicines)
router.get('/stores', getStores)
router.post('/order', placeOrder)

export default router
