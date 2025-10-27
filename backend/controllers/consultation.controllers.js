const Consultation = require('../models/Consultation')

exports.bookConsultation = async (req, res) => {
  try {
    const { doctorId, patientId, scheduledAt } = req.body
    const consultation = await Consultation.create({ doctorId, patientId, scheduledAt })
    res.json(consultation)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.findAll()
    res.json(consultations)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
