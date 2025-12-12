import { supabase } from '../config/supabase.js'

export const createAppointment = async (req, res) => {
  try {
    const { doctor_id, appointment_time } = req.body

    const { data, error } = await supabase.from('appointments').insert([{
      patient_id: req.user.id,
      doctor_id,
      appointment_time
    }])

    if (error) throw error
    res.json({ message: 'Appointment created', data })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getAppointments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .or(`patient_id.eq.${req.user.id},doctor_id.eq.${req.user.id}`)

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
