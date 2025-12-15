import { supabase } from "../config/supabase.js";

export const getAllDoctors = async (req, res) => {
  try {
    const { data: doctors, error } = await supabase
      .from('doctors')
      .select('*');

    if (error) {
      return res.status(500).json({ error: "Failed to fetch doctors" });
    }

    return res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    return res.status(500).json({ error: "Server error" });
  }
};