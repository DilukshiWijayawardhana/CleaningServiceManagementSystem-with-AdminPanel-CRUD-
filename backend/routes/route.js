const express = require("express");
const authRoutes = require("./auth.routes");
const bookingRoutes = require("./booking.routes");
const serviceRoutes = require("./service.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/bookings", bookingRoutes);
router.use("/services", serviceRoutes);

module.exports = router;
