const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
    startDay: {
      type: Date,
      required: true,
    },
    endDay: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    scheduledDays: {
      type: [Number], // ví dụ: [1,2,3,4,5]
      default: [],
    },
    exceptions: {
      type: [Date],
      default: [],
    },
    deviceIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device",
      },
    ],
  },
  { timestamps: true }
);

scheduleSchema.index({ createdBy: 1, activeStatus: 1 });

module.exports = mongoose.model("Schedule", scheduleSchema);