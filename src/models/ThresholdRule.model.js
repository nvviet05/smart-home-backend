const mongoose = require("mongoose");

const thresholdRuleSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dataType: {
      type: String,
      required: true,
      trim: true,
    },
    thresholdValue: {
      type: Number,
      required: true,
    },
    thresholdUnit: {
      type: String,
      default: "",
    },
    alertValue: {
      type: Number,
      required: true,
    },
    alertUnit: {
      type: String,
      default: "",
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
    cooldownTime: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ThresholdRule", thresholdRuleSchema);