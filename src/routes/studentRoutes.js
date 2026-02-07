const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const studentController = require("../controllers/studentController");

router.get("/", auth, studentController.getAllStudents);

module.exports = router;
