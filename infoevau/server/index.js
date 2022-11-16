const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
app.listen(3001, () => {
  console.log("Server running on port 3001");
});

const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
db.connect();

app.get("/", (req, res) => {
  dbQuery("SHOW COLUMNS FROM ALUMNO", req, res);
});

app.get("/alumnos", (req, res) => {
  dbQuery("SELECT * FROM ALUMNO", req, res);
});

app.get("/aulas", (req, res) => {
  dbQuery("SELECT * FROM AULA", req, res);
});

app.get("/institutos", (req, res) => {
  dbQuery("SELECT * FROM INSTITUTO", req, res);
});

app.get("/materias", (req, res) => {
  dbQuery("SELECT * FROM MATERIA", req, res);
});

app.get("/matriculas", (req, res) => {
  dbQuery("SELECT * FROM MATRICULA", req, res);
});

app.get("/responsables", (req, res) => {
  dbQuery("SELECT * FROM RESPONSABLE", req, res);
});

app.get("/sedes", (req, res) => {
  dbQuery("SELECT * FROM SEDE", req, res);
});

const dbQuery = (query, req, res) => {
  db.query(query, (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};
