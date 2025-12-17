import express from 'express';
import { bookConsultation, getPatientConsultations, getDoctorConsultations } from '../controllers/consultation.controllers.js';

const router = express.Router();

router.post('/book', bookConsultation);
router.get('/patient/:patient_id', getPatientConsultations);
router.get('/doctor/:doctor_id', getDoctorConsultations);

export default router;