const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
const { protect } = require("../middlewares/authMiddleware");

router.use(protect);

router.post("/", donationController.createDonation);
router.get("/:id", donationController.getDonationById);
router.put("/:id/status", donationController.updateDonationStatus);
router.put("/:bookingId/cancel", donationController.cancelDonation);
router.get("/user/:userId", donationController.getUserDonations);

module.exports = router;
