import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.routes.js';
import doctorRoutes from './routes/doctor.routes.js';
import consultationRoutes from './routes/consultation.routes.js';
import pharmacyRoutes from './routes/pharmacy.routes.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/pharmacy', pharmacyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Join a video call room
  socket.on("join-room", async (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", socket.id);
    socket.to(roomId).emit("incoming-call", {
      from: socket.id,
      roomId: roomId,
      message: "Someone is calling you!"
    });

    // Log call start
    try {
      const CallLog = (await import('./models/CallLog.js')).default;
      await CallLog.create({
        roomId: roomId,
        callerId: socket.userId || null,
        startTime: new Date(),
        status: 'ongoing'
      });
      console.log(`📞 Call started in room ${roomId}`);
    } catch (error) {
      console.error('Error logging call start:', error);
    }

    console.log(`📌 ${socket.id} joined room ${roomId}`);
  });

  // Exchange signaling data (offer/answer/ICE)
  socket.on("signal", ({ roomId, signalData }) => {
    socket.to(roomId).emit("signal", { socketId: socket.id, signalData });
  });

  // Handle call acceptance
  socket.on("accept-call", ({ roomId }) => {
    socket.to(roomId).emit("call-accepted", { from: socket.id });
  });

  // Handle call rejection
  socket.on("reject-call", ({ roomId }) => {
    socket.to(roomId).emit("call-rejected", { from: socket.id });
  });

  // Handle call end
  socket.on("end-call", async ({ roomId }) => {
    socket.to(roomId).emit("call-ended", { from: socket.id });

    // Log call end
    try {
      const CallLog = (await import('./models/CallLog.js')).default;
      const callLog = await CallLog.findOne({
        where: { roomId: roomId, status: 'ongoing' },
        order: [['startTime', 'DESC']]
      });

      if (callLog) {
        const endTime = new Date();
        const duration = Math.floor((endTime - callLog.startTime) / 1000);
        await callLog.update({
          endTime: endTime,
          duration: duration,
          status: 'completed'
        });
        console.log(`📞 Call ended in room ${roomId}, duration: ${duration}s`);
      }
    } catch (error) {
      console.error('Error logging call end:', error);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});