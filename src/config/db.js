const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ulindu@123",
  database: "node_express_studentmanagement"
});

module.exports = db; 

