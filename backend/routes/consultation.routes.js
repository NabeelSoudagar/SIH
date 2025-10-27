const express = require('express')
const router = express.Router()
const consultationController = require('../controllers/consultation.controller')

router.post('/book', consultationController.bookConsultation)
router.get('/', consultationController.getConsultations)

module.exports = router
