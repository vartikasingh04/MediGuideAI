const express = require("express");

const router = express.Router();

const {
  createAssessment,
  updateSymptoms,
  getAssessments,
} = require("../controllers/assessmentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  createAssessment
);

router.put(
  "/:id/symptoms",
  authMiddleware,
  updateSymptoms
);

router.get(
  "/",
  authMiddleware,
  getAssessments
);

module.exports = router;