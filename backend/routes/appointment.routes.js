import express from 'express'
import { verifyUser } from '../middleware/auth.middleware.js'
import { createAppointment, getAppointments } from '../controllers/appointment.controller.js'

const router = express.Router()

router.post('/', verifyUser, createAppointment)
router.get('/', verifyUser, getAppointments)

export default router
