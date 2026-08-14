const mongoose = require("mongoose");

const assessmentSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      age: {
        type: Number,
        required: true,
      },

      gender: {
        type: String,
        required: true,
      },

      existingCondition: {
        type: String,
        required: true,
      },

      symptoms: {
        type: [String],
        default: [],
      },

      symptomDetails: {
        type: Object,
        default: {},
      },

      result: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Assessment",
    assessmentSchema
  );