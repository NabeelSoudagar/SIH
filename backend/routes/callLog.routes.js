import express from 'express';
import { createCallLog, endCall, getCallHistory } from '../controllers/callLog.controller.js';

const router = express.Router();

router.post('/', createCallLog);
router.put('/:call_id/end', endCall);
router.get('/history/:user_id', getCallHistory);

export default router;