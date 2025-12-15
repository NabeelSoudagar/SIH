import { supabase } from "../config/supabase.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { email, password, role, profile } = req.body;

    if (!profile?.name || !email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        name: profile.name,
        email: email,
        password: password,
        role: role
      })
      .select()
      .single();

    if (userError) {
      return res.status(400).json({ error: "Email already exists or invalid data" });
    }

    const userId = userData.id;

    if (role === "patient") {
      const { error: patientError } = await supabase
        .from('patients')
        .insert({
          id: userId,
          full_name: profile.name,
          age: profile.age || null,
          village: profile.village || ""
        });

      if (patientError) {
        return res.status(500).json({ error: "Failed to create patient profile" });
      }

      return res.json({ message: "Patient registered successfully", id: userId });
    }

    if (role === "doctor") {
      const { error: doctorError } = await supabase
        .from('doctors')
        .insert({
          id: userId,
          full_name: profile.name,
          specialization: profile.specialization || "",
          registration_no: profile.registration_no || ""
        });

      if (doctorError) {
        return res.status(500).json({ error: "Failed to create doctor profile" });
      }

      return res.json({ message: "Doctor registered successfully", id: userId });
    }

    return res.status(400).json({ error: "Invalid role" });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data: users, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('role', role)
      .single();

    if (userError || !users) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (users.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: users.id, email: users.email, role: users.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    const user = {
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role
    };

    return res.json({ 
      message: "Login successful", 
      user,
      token
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Login failed" });
  }
};