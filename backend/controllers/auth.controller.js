import { db } from "../config/db.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { email, password, role, profile } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "patient") {
      const [result] = await db.query(
        "INSERT INTO patients (name, email, password, age, gender, phone) VALUES (?, ?, ?, ?, ?, ?)",
        [profile.name, email, hashedPassword, profile.age, profile.gender, profile.phone]
      );
      return res.json({ message: "Patient registered", id: result.insertId });
    }

    if (role === "doctor") {
      const [result] = await db.query(
        "INSERT INTO doctors (name, email, password, specialization, phone) VALUES (?, ?, ?, ?, ?)",
        [profile.name, email, hashedPassword, profile.specialization, profile.phone]
      );
      return res.json({ message: "Doctor registered", id: result.insertId });
    }

    res.status(400).json({ error: "Invalid role" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { mobile, role } = req.body;

    const table = role === "doctor" ? "doctors" : "patients";
    const [rows] = await db.query(`SELECT * FROM ${table} WHERE phone = ?`, [mobile]);

    if (rows.length === 0) return res.status(400).json({ error: "User not found" });

    const user = rows[0];

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
