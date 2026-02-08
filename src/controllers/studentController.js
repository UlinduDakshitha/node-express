const e = require("express");
const db = require("../config/db");

exports.getAllStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });

  exports.createStudent = (req, res) => {
    const { name, age, grade } = req.body;  
    db.query("INSERT INTO students (name, age, grade) VALUES (?, ?, ?)", [name, age, grade], (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: results.insertId, name, age, grade });
    });
  };

  exports.getStudentById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM students WHERE id = ?", [id], (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) return res.status(404).json({ message: "Student not found" });
      res.json(results[0]);
    });
  };
};
