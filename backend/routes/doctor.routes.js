import express from 'express'
import { verifyUser } from '../middleware/auth.middleware.js'
import { getProfile } from '../controllers/doctor.controller.js'

const router = express.Router()

router.get('/me', verifyUser, getProfile)

export default router
