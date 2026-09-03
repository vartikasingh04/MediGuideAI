const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRouter");
const assessmentRoutes = require("./routes/assessmentRouter");

dotenv.config();

const app = express();

/* =========================
   CORS
========================= */

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://madiguideai.vercel.app",
    "https://madiguideai-git-main-vartikasingh04s-projects.vercel.app",
    "https://madiguide-l2hyrgkt8-vartikasingh04s-projects.vercel.app",
  ],

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  credentials: true,
};

app.use(cors(corsOptions));

/* =========================
   BODY PARSER
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   TEST
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MediGuideAI Backend is running",
  });
});

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/assessment", assessmentRoutes);

/* =========================
   404
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

/* =========================
   ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "production"
        ? undefined
        : err.message,
  });
});

/* =========================
   PORT
========================= */

const PORT = process.env.PORT || 5000;

/* =========================
   DATABASE
========================= */

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);

    process.exit(1);
  }
};

connectDB();