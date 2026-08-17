const Assessment = require("../models/Assessment");

// ==========================================
// CREATE ASSESSMENT
// POST /api/assessments
// ==========================================

const createAssessment = async (req, res) => {
  try {
    const {
      age,
      gender,
      existingCondition,
    } = req.body;

    // Validation
    if (!age || !gender || !existingCondition) {
      return res.status(400).json({
        success: false,
        message:
          "Age, gender and existing condition are required",
      });
    }

    // Create assessment
    const assessment = await Assessment.create({
      user: req.user.userId,
      age: Number(age),
      gender,
      existingCondition,
      symptoms: [],
      symptomDetails: {},
      result: "",
    });

    return res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      assessment,
    });
  } catch (error) {
    console.error(
      "Create assessment error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create assessment",
    });
  }
};

// ==========================================
// GET ALL USER ASSESSMENTS
// GET /api/assessments
// ==========================================

const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: assessments.length,
      assessments,
    });
  } catch (error) {
    console.error(
      "Get assessments error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get assessments",
    });
  }
};

// ==========================================
// GET SINGLE ASSESSMENT
// GET /api/assessments/:id
// ==========================================

const getAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const assessment =
      await Assessment.findOne({
        _id: id,
        user: req.user.userId,
      });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    return res.status(200).json({
      success: true,
      assessment,
    });
  } catch (error) {
    console.error(
      "Get assessment error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get assessment",
    });
  }
};

// ==========================================
// UPDATE SYMPTOMS
// PUT /api/assessments/:id/symptoms
// ==========================================

const updateSymptoms = async (req, res) => {
  try {
    const { id } = req.params;
    const { symptoms } = req.body;

    // Validation
    if (
      !Array.isArray(symptoms) ||
      symptoms.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide at least one symptom",
      });
    }

    const assessment =
      await Assessment.findOneAndUpdate(
        {
          _id: id,
          user: req.user.userId,
        },
        {
          symptoms,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Symptoms saved successfully",
      assessment,
    });
  } catch (error) {
    console.error(
      "Update symptoms error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to save symptoms",
    });
  }
};

// ==========================================
// UPDATE SYMPTOM DETAILS
// PUT /api/assessments/:id/symptom-details
// ==========================================

const updateSymptomDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { symptomDetails } = req.body;

    // Validation
    if (
      !symptomDetails ||
      typeof symptomDetails !== "object"
    ) {
      return res.status(400).json({
        success: false,
        message: "Symptom details are required",
      });
    }

    const assessment =
      await Assessment.findOneAndUpdate(
        {
          _id: id,
          user: req.user.userId,
        },
        {
          symptomDetails,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Symptom details saved successfully",
      assessment,
    });
  } catch (error) {
    console.error(
      "Update symptom details error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to save symptom details",
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  createAssessment,
  getAssessments,
  getAssessmentById,
  updateSymptoms,
  updateSymptomDetails,
};