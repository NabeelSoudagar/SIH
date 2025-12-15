import express from 'express';
import { getAllMedicines, createOrder } from '../controllers/pharmacy.controller.js';

const router = express.Router();

router.get('/medicines', getAllMedicines);
router.post('/orders', createOrder);

export default router;