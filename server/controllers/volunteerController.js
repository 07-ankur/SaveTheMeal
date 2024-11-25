const User = require("../models/User");
const Donation = require("../models/Donation");

exports.updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const volunteer = await User.findByIdAndUpdate(
      req.user.id,
      { location: { latitude, longitude } },
      { new: true }
    );
    res.json({
      message: "Location updated successfully",
      location: volunteer.location,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating location", error: error.message });
  }
};

exports.getAvailableJobs = async (req, res) => {
  try {
    const jobs = await Donation.find({ status: "pending" }).populate(
      "user",
      "name"
    );
    res.json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching available jobs",
        error: error.message,
      });
  }
};

exports.acceptJob = async (req, res) => {
  try {
    const job = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: "accepted", volunteer: req.user.id },
      { new: true }
    ).populate("user", "name");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accepting job", error: error.message });
  }
};

exports.getVolunteerJobs = async (req, res) => {
  try {
    const jobs = await Donation.find({ volunteer: req.user.id }).populate(
      "user",
      "name"
    );
    res.json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching volunteer jobs",
        error: error.message,
      });
  }
};
