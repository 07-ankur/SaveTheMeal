const User = require("../models/User");
const Donation = require("../models/Donation");

exports.getDashboardData = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const start = startDate
      ? new Date(startDate)
      : new Date(new Date().setDate(new Date().getDate() - 30));
    const end = endDate ? new Date(endDate) : new Date();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const [donorCount, volunteerCount, ngoCount] = await Promise.all([
      User.countDocuments({ role: "donor" }),
      User.countDocuments({ role: "volunteer" }),
      User.countDocuments({ role: "ngo" }),
    ]);

    const donations = await Donation.find({
      createdAt: { $gte: start, $lte: end },
    })
      .populate("donor", "name email")
      .populate("volunteer", "name email volunteerInfo")
      .populate("ngo", "name email ngoInfo");

    const donationCount = donations.length;

    // const totalDonation = donations.reduce(
    //   (sum, booking) => sum + (booking.price || 0),
    //   0
    // );

    const donationAnalytics = await Donation.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: "completed",
        },
      },
      // {
      //   $group: {
      //     _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      //     totalRevenue: { $sum: "$price" },
      //   },
      // },
      { $sort: { _id: 1 } },
    ]);

    const [donors, volunteers] = await Promise.all([
      User.find({ role: "donor" }).select("-password"),
      User.find({ role: "volunteer" }).select("-password"),
    ]);

    res.json({
      donorCount,
      volunteerCount,
      ngoCount,
      donationCount,
      donationAnalytics,
      donations,
      donors,
      volunteers,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res
      .status(500)
      .json({ message: "Error fetching dashboard data", error: error.message });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const donorCount = await User.countDocuments({ role: "donor" });
    const volunteerCount = await User.countDocuments({ role: "volunteer" });

    res.json({ totalUsers, donorCount, volunteerCount });
  } catch (error) {
    console.error("User stats error:", error);
    res
      .status(500)
      .json({ message: "Error fetching user stats", error: error.message });
  }
};

exports.getDonationStats = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const completedDonations = await Donation.countDocuments({
      status: "completed",
    });
    const activeDonations = await Donation.countDocuments({
      status: "in_progress",
    });
    const pendingDonations = await Donation.countDocuments({ status: "pending" });
    const cancelledDonations = await Donation.countDocuments({
      status: "cancelled",
    });

    res.json({
      totalDonations,
      completedDonations,
      activeDonations,
      pendingDonations,
      cancelledDonations,
    });
  } catch (error) {
    console.error("Donation stats error:", error);
    res
      .status(500)
      .json({ message: "Error fetching donation stats", error: error.message });
  }
};
