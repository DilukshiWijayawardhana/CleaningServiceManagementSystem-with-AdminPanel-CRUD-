const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/service.controller");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middleware/auth.middleware");

// View all services - public
router.get("/", serviceController.getAll);

// Add a new service - Admin only
router.post("/", authenticateToken, authorizeAdmin, serviceController.create);

// Delete a service - Admin only
router.delete(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  serviceController.remove
);

// Update a service - Admin only (optional)
router.put("/:id", authenticateToken, authorizeAdmin, serviceController.update);

module.exports = router;
