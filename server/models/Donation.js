const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    volunteer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pickupLocation: { type: String, required: true },
    dropoffNGO: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    price: { type: Number },
    currentLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
