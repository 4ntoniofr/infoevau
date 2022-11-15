const express = require('express');
const app = express();
app.use(express.json());
app.listen(3001, () => {
    console.log("Server running on port 3001")
});

var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'database-pevau.cobadwnzalab.eu-central-1.rds.amazonaws.com',
  port     : 3306,
  user     : 'grupo16',
  password : 'gLeyR5vXhrRUjqmX',
  database : 'grupo16DB'
});
db.connect();
db.query('SELECT 1+1 AS solution;', (err, res, fields) => {
	if (err) throw err;
	console.log(res[0].solution);
});