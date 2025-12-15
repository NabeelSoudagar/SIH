import { supabase } from "../config/supabase.js";

export const getAllPatients = async (req, res) => {
  try {
    const { data: patients, error } = await supabase
      .from('patients')
      .select('*');

    if (error) {
      return res.status(500).json({ error: "Failed to fetch patients" });
    }

    return res.json(patients);
  } catch (err) {
    console.error("Error fetching patients:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: patient, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: "Patient not found" });
    }

    return res.json(patient);
  } catch (err) {
    console.error("Error fetching patient:", err);
    return res.status(500).json({ error: "Server error" });
  }
};