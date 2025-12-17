import express from 'express';
import { bookConsultation, getPatientConsultations, getDoctorConsultations } from '../controllers/consultation.controllers.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/book', authenticateToken, bookConsultation);
router.get('/patient/:patient_id', authenticateToken, getPatientConsultations);
router.get('/doctor/:doctor_id', authenticateToken, getDoctorConsultations);

export default router;