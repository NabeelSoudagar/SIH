// D:/SIH_Project/backend/routes/consultation.routes.js

import express from 'express';
import consultationController from '../controllers/consultation.controllers.js';

const router = express.Router();

// POST /api/consultations/book
router.post('/book', consultationController.bookConsultation);

// GET /api/consultations
router.get('/', consultationController.getConsultations);

// GET /api/consultations/patient
router.get('/patient', consultationController.getPatientConsultations);

// GET /api/consultations/doctor
router.get('/doctor', consultationController.getDoctorConsultations);

export default router;
