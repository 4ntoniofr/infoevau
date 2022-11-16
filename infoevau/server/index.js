const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
app.listen(3001, () => {
  console.log("Server running on port 3001");
});

var mysql = require("mysql");
var db = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
db.connect();
db.query("SHOW TABLES", (err, res, fields) => {
  if (err) throw err;
  console.log(res);
});
