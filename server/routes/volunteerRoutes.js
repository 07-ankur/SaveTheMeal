const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.use(protect, authorize("volunteer"));

router.put("/location", volunteerController.updateLocation);
router.get("/jobs/available", volunteerController.getAvailableJobs);
router.put("/jobs/:id", volunteerController.acceptJob);
router.get("/jobs", volunteerController.getVolunteerJobs);

module.exports = router;
