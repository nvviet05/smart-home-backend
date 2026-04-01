const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ownerIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

homeSchema.index({ ownerIds: 1 });

module.exports = mongoose.model("Home", homeSchema);