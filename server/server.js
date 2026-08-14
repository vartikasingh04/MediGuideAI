const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// ==========================================
// LOAD ENVIRONMENT VARIABLES FIRST
// ==========================================

dotenv.config();

// ==========================================
// DATABASE
// ==========================================

const connectDB = require("./config/db");

// ==========================================
// ROUTES
// ==========================================

const authRoutes = require("./routes/authRouter");
const assessmentRoutes = require("./routes/assessmentRouter");

// ==========================================
// APP
// ==========================================

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ==========================================
// DATABASE CONNECTION
// ==========================================

connectDB();

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MediGuide AI API is running",
  });
});

// ==========================================
// AUTH ROUTES
// ==========================================

// POST /api/auth/register
// POST /api/auth/login

app.use("/api/auth", authRoutes);

// ==========================================
// ASSESSMENT ROUTES
// ==========================================

// POST /api/assessments
// GET  /api/assessments
// GET  /api/assessments/:id
// PUT  /api/assessments/:id/symptoms
// PUT  /api/assessments/:id/symptom-details

app.use("/api/assessments", assessmentRoutes);

// ==========================================
// 404 ROUTE
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ==========================================
// ERROR HANDLER
// ==========================================

app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});