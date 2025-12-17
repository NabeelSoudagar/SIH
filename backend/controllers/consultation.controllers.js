import { supabase } from "../config/supabase.js";

export const bookConsultation = async (req, res) => {
  try {
    const { doctor_id, patient_id, scheduledAt } = req.body;
    
    console.log('Booking consultation with data:', { doctor_id, patient_id, scheduledAt });

    if (!doctor_id || !patient_id || !scheduledAt) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data: consultation, error } = await supabase
      .from('consultations')
      .insert({
        doctor_id,
        patient_id,
        scheduled_at: scheduledAt
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message || "Failed to book consultation" });
    }

    return res.json({ 
      message: "Consultation booked successfully", 
      consultation 
    });
  } catch (err) {
    console.error("Error booking consultation:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
};

export const getPatientConsultations = async (req, res) => {
  try {
    const { patient_id } = req.params;

    const { data: consultations, error } = await supabase
      .from('consultations')
      .select(`
        *,
        doctors (
          full_name,
          specialization
        )
      `)
      .eq('patient_id', patient_id);

    if (error) {
      return res.status(500).json({ error: "Failed to fetch consultations" });
    }

    return res.json(consultations);
  } catch (err) {
    console.error("Error fetching consultations:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getDoctorConsultations = async (req, res) => {
  try {
    const { doctor_id } = req.params;

    const { data: consultations, error } = await supabase
      .from('consultations')
      .select(`
        *,
        patients (
          full_name,
          age
        )
      `)
      .eq('doctor_id', doctor_id);

    if (error) {
      return res.status(500).json({ error: "Failed to fetch consultations" });
    }

    return res.json(consultations);
  } catch (err) {
    console.error("Error fetching consultations:", err);
    return res.status(500).json({ error: "Server error" });
  }
};