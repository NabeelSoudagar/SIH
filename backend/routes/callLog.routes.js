import express from 'express';
import callLogController from '../controllers/callLog.controller.js';

const router = express.Router();

// GET /api/call-logs
router.get('/', callLogController.getCallLogs);

export default router;
