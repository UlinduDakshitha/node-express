const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const studentController = require("../controllers/studentController");

router.get("/getAll", auth, studentController.getAllStudents);
router.post("/save", auth, studentController.createStudent);
router.get("/get/:id", auth, studentController.getStudentById);
router.put("/update/:id", auth, studentController.updateStudent);
router.delete("/delete/:id", auth, studentController.deleteStudent);

module.exports = router;
