const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    homeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Home",
      required: true,
      index: true,
    },
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
      default: null,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type:{
        type: String,
        required: true,
        enum: ['light', 'fan'],
    },
    status: {
        type: String,
        enum: ['on', 'off', 'disconnected'],
        default: 'off',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);