const express = require("express");
require("dotenv").config();
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
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

const dbQuery = (query, req, res) => {
	db.query(query, (error, results) => {
		if (error) throw error;
		res.status(200).json(results);
	});
};

/**
 * Consultas de las tablas
 */

app.get("/", (req, res) => {
	dbQuery("SHOW COLUMNS FROM ALUMNO", req, res);
});

app.get("/alumnos", (req, res) => {
	dbQuery("SELECT * FROM ALUMNO", req, res);
});

app.post("/aulas", (req, res) => {
	let sede = req.body.sede;
	dbQuery("SELECT * FROM AULA WHERE Sede = '" + sede + "';", req, res);
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

app.get("/responsablesDisponibles", (req, res) => {
	dbQuery("SELECT Nombre FROM RESPONSABLE WHERE Nombre NOT IN (SELECT Responsable FROM SEDE WHERE Responsable IS NOT NULL)", req, res)
})

app.get("/sedes", (req, res) => {
	dbQuery("SELECT * FROM SEDE ORDER BY 1", req, res);
});

app.post("/responsablesSede", (req, res) => {
	let sede = req.body.sede;
	dbQuery("SELECT Responsable FROM SEDE WHERE Nombre = '" + sede + "';", req, res);
});

app.get("/institutosDisponibles", (req, res) => {
	dbQuery("SELECT I.Nombre, COUNT(*) 'NumAlumnos' FROM INSTITUTO I JOIN ALUMNO A ON (A.Instituto = I.Nombre) "
		+ "WHERE I.Sede IS NULL GROUP BY I.Nombre;", req, res);
});

app.get("/institutosAsignados", (req, res) => {
	let sede = req.body.sede;
	dbQuery("SELECT I.Nombre, COUNT(*) 'NumAlumnos' FROM INSTITUTO I JOIN ALUMNO A ON (A.Instituto = I.Nombre) "
	+ "WHERE I.Sede = '" + sede + "' GROUP BY I.Nombre;", req, res);	
})


/**
 * Alumnos
 */

app.post("/nuevosAlumnos", (req, res) => {
	let alumnos = req.body.alumnos;

	db.query('INSERT INTO ALUMNO VALUES ?;', [alumnos], (err, res, f) => {
		if (err) console.log(err)	//'ERROR en la insercion de alumnos'
		else console.log('Insercion satisfactoria de', alumnos.length, 'alumnos')
	})
	res.send();
});

app.post("/nuevasMatriculaciones", (req, res) => {
	let matriculaciones = req.body.matriculaciones;

	db.query('INSERT INTO MATRICULA VALUES ?;', [matriculaciones], (err, res, f) => {
		if (err) console.log(err)	//'ERROR en la insercion de matriculas'
		else console.log('Insercion satisfactoria de', matriculaciones.length, 'matriculas')
	})
	res.send();
});

/**
 * Responsables
 */

app.post("/asignarResponsable", (req, res) => {
	let responsable = req.body.responsable;
	let sede = req.body.sede;

	db.query("UPDATE SEDE SET Responsable = '" + responsable + "' where Nombre = '" + sede + "' ORDER BY Nombre;", (err, res, f) => {
		if (err) console.log(err)
	})
	res.send();
})

app.post("/desasignarResponsable", (req, res) => {
	let sede = req.body.sede;

	db.query("UPDATE SEDE SET Responsable = NULL WHERE Nombre = '" + sede + "';", (err, res, f) => {
		if (err) console.log(err)
	})
	res.send();

})

app.post("/nuevosResponsables", (req, res) => {
	console.log(req.body.responsables)
	let responsables = req.body.responsables;
	responsables.forEach(r => {
		if (r != '') {
			db.query("INSERT INTO RESPONSABLE(Nombre) VALUES (?);", [r], (err, res, f) => {
				if (err) console.log(err);
			})
		}
	})
});

/**
 * Institutos
 */

app.post("/nuevosInstitutos", (req, res) => {
	let institutos = req.body.institutos;

	db.query("INSERT INTO INSTITUTO(Nombre) VALUES ?;", [institutos], (err, res, f) => {
		if (err) console.log(err)
		else console.log('Insercion exitosa de institutos')
	})
});

/**
 * Sedes
 */

app.post("/nuevasSedes", (req, res) => {
	let sedes = req.body.sedes;
	sedes.forEach(s => {
		if (s != '') {
			db.query("INSERT INTO SEDE(Nombre) VALUES (?);", [s], (err, res, f) => {
				if (err) console.log(err);
			})
		}
	})
});

app.post("/borrarSede", (req, res) => {
	let sede = req.body.sedeBorrar;
	console.log(req.body)

	db.query("DELETE FROM SEDE WHERE Nombre = ?;", [sede], (err, res, f) => {
		if (err) console.log(err)
		else console.log('Eliminación satisfactoria de ', sede)
	})
	res.send();
})

app.post("/modificarSede", (req, res) => {
	let prevSede = req.body.prevSede;
	let postSede = req.body.postSede;
	console.log(prevSede)

	db.query("UPDATE SEDE SET Nombre = ? WHERE Nombre = ?;", [postSede, prevSede], (err, res, f) => {
		if (err) console.log(err)
		else console.log('Modificacion satisfactoria de ', prevSede)
	})
	res.send();
})

app.get("/deleteSedes", (req, res) => {
	db.query("DELETE FROM SEDE", (err, res, f) => {
		if (err) console.log(err)
		else console.log('Tabla SEDE borrada');
	});
})

/**
 * Aulas
 */

app.post("/borrarAula", (req, res) => {
	let aula = req.body.aulaBorrar;
	console.log(req.body)

	db.query("DELETE FROM AULA WHERE ID = ?;", [aula], (err, res, f) => {
		if (err) console.log(err)
		else console.log('Eliminación satisfactoria de ', aula)
	})
	res.send();
})

app.post("/modificarAula", (req, res) => {
	let prevID = req.body.prevID;
	let sedeAula = req.body.sedeAula;

	let postID = req.body.postID;
	let postCapacidad = req.body.postCapacidad;
	let postDisponibilidad = req.body.postDisponibilidad;

	db.query("UPDATE AULA SET Id = ?, Capacidad = ?, Disponibilidad = ? WHERE Id = ? AND Sede = ?;", [postID, postCapacidad, postDisponibilidad, prevID, sedeAula], (err, res, f) => {
		if (err) console.log(err)
		else console.log('Modificacion satisfactoria de ', prevID)
	})
	res.send();
})

app.post("/nuevaAula", (req, res) => {
	let Id = req.body.Id;
	let Capacidad = req.body.Capacidad;
	let Disponibilidad = req.body.Disponibilidad;
	let Sede = req.body.Sede;

	if (Id != null && Capacidad != null && Disponibilidad != null)
		db.query("INSERT INTO AULA(Id,Capacidad,Disponibilidad,Sede) VALUES (?,?,?,?);", [Id, Capacidad, Disponibilidad, Sede], (err, res, f) => {
			if (err) console.log(err);
		})
});