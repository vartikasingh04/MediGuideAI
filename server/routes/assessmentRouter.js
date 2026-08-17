const express = require("express");

const router = express.Router();

const {
  createAssessment,
  getAssessments,
  getAssessmentById,
  updateSymptoms,
  updateSymptomDetails,
} = require("../controllers/assessmentController");

const authMiddleware = require("../middleware/authMiddleware");

// Create
router.post("/", authMiddleware, createAssessment);

// Get all
router.get("/", authMiddleware, getAssessments);

// Get one
router.get("/:id", authMiddleware, getAssessmentById);

// Update symptoms
router.put("/:id/symptoms", authMiddleware, updateSymptoms);

// Update symptom details
router.put(
  "/:id/symptom-details",
  authMiddleware,
  updateSymptomDetails
);

module.exports = router;