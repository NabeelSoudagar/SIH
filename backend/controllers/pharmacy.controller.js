import { supabase } from "../config/supabase.js";

export const getAllMedicines = async (req, res) => {
  try {
    const { data: medicines, error } = await supabase
      .from('medicines')
      .select('*');

    if (error) {
      return res.status(500).json({ error: "Failed to fetch medicines" });
    }

    return res.json(medicines);
  } catch (err) {
    console.error("Error fetching medicines:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { patient_id, medicines, total_amount } = req.body;

    const { data: order, error } = await supabase
      .from('pharmacy_orders')
      .insert({
        patient_id,
        medicines,
        total_amount,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Failed to create order" });
    }

    return res.json({ message: "Order created successfully", order });
  } catch (err) {
    console.error("Error creating order:", err);
    return res.status(500).json({ error: "Server error" });
  }
};