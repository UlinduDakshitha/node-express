const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

// REGISTER
exports.register = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, hashedPassword], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User registered" });
  });
};

// LOGIN
exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username=?", [username], (err, users) => {
    if (err || users.length === 0)
      return res.status(401).json({ message: "User not found" });

    const user = users[0];
    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    res.json({ token });
  });
};
