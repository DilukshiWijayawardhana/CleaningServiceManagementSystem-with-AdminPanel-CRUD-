const express = require("express");
const router = express.Router();

const controller = require("../controllers/booking.controller");
const { authenticateToken } = require("../middleware/auth.middleware"); // ✅ destructure correctly

router.post("/", authenticateToken, controller.create);
router.get("/", authenticateToken, controller.getAll);
router.put("/:id", authenticateToken, controller.update);
router.delete("/:id", authenticateToken, controller.remove);

module.exports = router;
