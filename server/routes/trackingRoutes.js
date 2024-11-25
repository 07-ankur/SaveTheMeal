const express = require("express");
const {
  getTrackingInfo,
  updateTracking,
} = require("../controllers/trackingController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:donationId", protect, getTrackingInfo);
router.put("/:donationId", protect, authorize("volunteer"), updateTracking);

module.exports = router;
