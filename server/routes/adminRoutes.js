const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.use(protect, authorize("admin"));

router.get("/dashboard", adminController.getDashboardData);
router.get("/user-stats", adminController.getUserStats);
router.get("/donation-stats", adminController.getDonationStats);

module.exports = router;
