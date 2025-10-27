import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'
import patientRoutes from './routes/patient.routes.js'
import doctorRoutes from './routes/doctor.routes.js'
import appointmentRoutes from './routes/appointment.routes.js'
import pharmacyRoutes from './routes/pharmacy.routes.js'




dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/pharmacy', pharmacyRoutes)


import { createServer } from "http";
import { Server } from "socket.io";


const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your Vue dev server
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Join a video call room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", socket.id);
    console.log(`📌 ${socket.id} joined room ${roomId}`);
  });

  // Exchange signaling data (offer/answer/ICE)
  socket.on("signal", ({ roomId, signalData }) => {
    socket.to(roomId).emit("signal", { socketId: socket.id, signalData });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Health check
app.get("/", (req, res) => {
  res.send("✅ Video Call Signaling Server Running");
});

import { signup, login } from "./controllers/auth.controller.js";

app.use(cors());
app.use(express.json());

app.post("/api/auth/signup", signup);
app.post("/api/auth/login", login);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

