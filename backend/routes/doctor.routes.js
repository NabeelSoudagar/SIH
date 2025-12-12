import express from 'express'
import { verifyUser } from '../middleware/auth.middleware.js'
import { getProfile, getAllDoctors } from '../controllers/doctor.controller.js'

const router = express.Router()

router.get('/', getAllDoctors)
router.get('/me', verifyUser, getProfile)

export default router
