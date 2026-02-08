const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check header exists
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  // 2. Check Bearer format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  // 3. Extract token ONLY
  const token = authHeader.split(" ")[1];

  // 4. Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = decoded.id;
    next(); // allow request
  });
};
