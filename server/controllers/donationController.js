const Donation = require("../models/Donation");
const User = require("../models/User");

exports.createDonation = async (req, res) => {
  try {
    const { pickupLocation, dropoffNGO } = req.body;

    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const donation = await Donation.create({
      user: userId, 
      pickupLocation,
      dropoffNGO,
      status: "pending", 
      volunteer: "N/A"
    });

    res.status(201).json({
      success: true,
      message: "Donation initiated successfully",
      donation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error initiating donation", error: error.message });
  }
};

exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate(
      "user volunteer",
      "name email"
    );
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    res.json(donation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching donation", error: error.message });
  }
};

exports.updateDonationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    res.json(donation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating booking status", error: error.message });
  }
};

exports.getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.params.userId }).populate(
      "volunteer",
      "name email"
    );
    res.json(donations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user donations", error: error.message });
  }
};

exports.cancelDonation = async (req, res) => {
  try {
    const donationId = req.params.donationId;
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.status === "cancelled") {
      return res.status(400).json({ message: "Donation is already cancelled" });
    }

    donation.status = "cancelled";
    await donation.save();

    res.status(200).json({
      success: true,
      message: "Donation cancelled successfully",
      donation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error cancelling booking",
      error: error.message,
    });
  }
};
