const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  // REMOVE "Bearer "
  const token = authHeader.split(" ")[1];

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = decoded.id;
    next();
  });
};
