const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
const { startup } = require("./startup.js");
const socketHandler = require("./socket/handler.js");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowEIO3: true,
  transports: ["websocket", "polling"],
});

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.startTime = Date.now();
  req.app.set('io', io);
  next();
});

// Routes
app.use("/", routes);

// Socket.io
socketHandler(io);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://hxsksab_db_user:AeZW0ujzo0OoJDws@cluster0.m8bgl4q.mongodb.net/bloxyspin?appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 2000,
  socketTimeoutMS: 2000,
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch(err => {
  console.warn("MongoDB not available - running in limited mode:", err.message);
});

// Startup
startup(io);

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { app, server, io };
