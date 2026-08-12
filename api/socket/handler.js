const socketRateLimit = new Map();
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config.js");
const userSockets = require("./usersockets.js");

module.exports = (io) => {
  io.on("connection", (socket) => {
    const ip = socket.handshake.address;
    const now = Date.now();

    if (!socketRateLimit.has(ip)) {
      socketRateLimit.set(ip, { count: 1, lastConnection: now });
    } else {
      const ipData = socketRateLimit.get(ip);
      const timeElapsed = now - ipData.lastConnection;

      if (ipData.count >= 5 && timeElapsed < 60 * 1000) {
        socket.disconnect(true);
        return;
      }

      if (timeElapsed >= 60 * 1000) {
        ipData.count = 0;
        ipData.lastConnection = now;
      }

      ipData.count++;
      socketRateLimit.set(ip, ipData);
    }

    const token = socket.handshake.auth?.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, jwt_secret);
        socket.userId = decoded.id;
        userSockets.set(decoded.id, socket.id);
      } catch (err) {
        console.warn("Socket authentication failed:", err.message);
      }
    }

    socket.on("disconnect", () => {
      if (socket.userId) {
        userSockets.delete(socket.userId, socket.id);
      }
    });
  });

  setInterval(() => {
    const clientCount = Object.keys(io.sockets.sockets || {}).length;
    io.emit("ONLINE_UPDATE", clientCount + 15);
  }, 2000);
};
