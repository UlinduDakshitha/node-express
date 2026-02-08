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
};
