const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NGO", ngoSchema);
