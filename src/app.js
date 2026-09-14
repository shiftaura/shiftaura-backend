const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const authRoutes = require("./routes/auth.routes");
const publicRoutes = require("./routes/public.routes");
const memberRoutes = require("./routes/member.routes");
const eventRoutes = require("./routes/event.routes");
const adminRoutes = require("./routes/admin.routes");
const mediaRoutes = require("./routes/media.routes");

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Team Hub API is running" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/media", mediaRoutes);

// Fallbacks
app.use(notFound);
app.use(errorHandler);

module.exports = app;