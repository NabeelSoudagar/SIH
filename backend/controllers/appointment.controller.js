import { supabase } from "../config/supabase.js";

export const createAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, appointment_date, notes } = req.body;

    if (!patient_id || !doctor_id || !appointment_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert({
        patient_id,
        doctor_id,
        appointment_date,
        notes: notes || '',
        status: 'scheduled'
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Failed to create appointment" });
    }

    return res.json({ 
      message: "Appointment created successfully", 
      appointment 
    });
  } catch (err) {
    console.error("Error creating appointment:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const { user_id, role } = req.query;

    let query = supabase.from('appointments').select(`
      *,
      patients (full_name, age),
      doctors (full_name, specialization)
    `);

    if (role === 'patient') {
      query = query.eq('patient_id', user_id);
    } else if (role === 'doctor') {
      query = query.eq('doctor_id', user_id);
    }

    const { data: appointments, error } = await query;

    if (error) {
      return res.status(500).json({ error: "Failed to fetch appointments" });
    }

    return res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return res.status(500).json({ error: "Server error" });
  }
};