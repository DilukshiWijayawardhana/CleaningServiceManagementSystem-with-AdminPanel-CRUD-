// middleware/auth.middleware.js

const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer TOKEN

  if (!token) return res.status(401).json({ error: "Access token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });

    req.user = user; // user object contains id and role
    next();
  });
}

// Middleware to check if user has ADMIN role
function authorizeAdmin(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
}

// Middleware to check if user has USER role
function authorizeUser(req, res, next) {
  if (req.user.role !== "USER") {
    return res.status(403).json({ error: "Access denied. Users only." });
  }
  next();
}

module.exports = {
  authenticateToken,
  authorizeAdmin,
  authorizeUser,
};
