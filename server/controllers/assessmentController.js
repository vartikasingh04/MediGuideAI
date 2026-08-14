// ==========================================
// UPDATE SYMPTOM DETAILS
// ==========================================

const updateSymptomDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { symptomDetails } = req.body;

    if (!symptomDetails) {
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
      message: "Symptom details saved successfully",
      assessment,
    });
  } catch (error) {
    console.error(
      "Update symptom details error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to save symptom details",
    });
  }
};