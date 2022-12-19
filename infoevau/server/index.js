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

/** =========================================================================
 *  Consultas de las tablas
 *  =========================================================================
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

app.post("/personal", (req, res) => {
	let sede = req.body.sede;
	dbQuery("SELECT * FROM RESPONSABLE_AULA WHERE Sede = '" + sede + "';", req, res);
})

app.get("/institutos", (req, res) => {
	dbQuery("SELECT * FROM INSTITUTO", req, res);
});

app.get("/materias", (req, res) => {
	dbQuery("SELECT * FROM MATERIA", req, res);
});

app.get("/matriculas", (req, res) => {
	dbQuery("SELECT * FROM MATRICULA", req, res);
});

app.get("/sedes", (req, res) => {
	dbQuery("SELECT * FROM SEDE ORDER BY 1", req, res);
});

app.post("/aforoSede", (req, res) => {
	let sede = req.body.sede;
	dbQuery("SELECT SUM(Capacidad) 'Capacidad' FROM AULA WHERE Sede = '" + sede + "';",req,res);
})

app.get("/responsablesDisponibles", (req, res) => {
	dbQuery("SELECT Nombre FROM RESPONSABLE WHERE Nombre NOT IN (SELECT Responsable FROM SEDE WHERE Responsable IS NOT NULL)", req, res)
})

app.post("/responsablesSede", (req, res) => {
	let sede = req.body.sede;
	dbQuery("SELECT Responsable FROM SEDE WHERE Nombre = '" + sede + "';", req, res);
});

app.get("/responsablesAsignados", (req, res) => {
	dbQuery("SELECT * FROM SEDE WHERE Responsable IS NOT NULL;", req, res);
})

app.get("/institutosDisponibles", (req, res) => {
	dbQuery("SELECT I.Nombre, COUNT(*) 'NumAlumnos' FROM INSTITUTO I JOIN ALUMNO A ON (A.Instituto = I.Nombre) "
		+ "WHERE I.Sede IS NULL GROUP BY I.Nombre;", req, res);
});

app.post("/institutosAsignados", (req, res) => {
	let sede = req.body.sede;
	dbQuery("SELECT I.Nombre, COUNT(*) 'NumAlumnos' FROM INSTITUTO I JOIN ALUMNO A ON (A.Instituto = I.Nombre) "
	+ "WHERE I.Sede = '" + sede + "' GROUP BY I.Nombre;", req, res);	
})


/** =========================================================================
 *  Alumnos
 *  =========================================================================
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

app.get("/deleteAlumnos", (req, res) => {
	db.query("DELETE FROM ALUMNO", (err, res, f) => {
		if (err) console.log(err)
		else console.log('Tabla ALUMNO borrada');
	});
})

/** =========================================================================
 *  Responsables
 *  =========================================================================
 */

app.post("/asignarResponsable", (req, res) => {
	let responsable = req.body.responsable.Nombre;
	let sede = req.body.sede.Nombre;
	db.query("UPDATE SEDE SET Responsable = '" + responsable + "' where Nombre = '" + sede + "';", (err, res, f) => {
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

/** =========================================================================
 *  Institutos
 *  =========================================================================
 */

app.post("/nuevosInstitutos", (req, res) => {
	let institutos = req.body.institutos;

	db.query("INSERT INTO INSTITUTO(Nombre) VALUES ?;", [institutos], (err, res, f) => {
		if (err) console.log(err)
		else console.log('Insercion exitosa de institutos')
	})
});

app.post("/asignarSedeInstituto", (req, res) => {
	let instituto = req.body.instituto;
	let sede = req.body.sede;

	db.query("UPDATE INSTITUTO SET Sede = ? WHERE Nombre = ?;", [sede,instituto], (err, res, f) => {
		if(err) console.log(err)
	});
});

app.post("/desasignarSedeInstituto", (req, res) => {
	let instituto = req.body.instituto;

	db.query("UPDATE INSTITUTO SET Sede = NULL WHERE Nombre = ?;", [instituto], (err, res, f) => {
		if(err) console.log(err)
	});
});

/** =========================================================================
 *  Sedes
 *  =========================================================================
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

	db.query("DELETE FROM AULA", (err, res, f) => {
		if (err) console.log(err)
		else console.log('Tabla AULA borrada');
	});

	db.query("DELETE FROM SEDE", (err, res, f) => {
		if (err) console.log(err)
		else console.log('Tabla SEDE borrada');
	});
})

/** =========================================================================
 *  Aulas
 *  =========================================================================
 */

app.post("/borrarAula", (req, res) => {
	let aula = req.body.aulaBorrar.Id;
	let sede = req.body.aulaBorrar.Sede;

	db.query("DELETE FROM AULA WHERE ID = ? AND Sede = ?;", [aula, sede], (err, res, f) => {
		if (err) console.log(err)
		else console.log('Eliminación satisfactoria de ', aula)
	})
	res.send();
})

app.post("/borrarAulasId", (req, res) => {
	let aula = req.body.aulaBorrar.Id;

	db.query("DELETE FROM AULA WHERE ID = ?;", [aula], (err, res, f) => {
		if (err) console.log(err)
		else console.log('Eliminación satisfactoria de ', aula)
	})
	res.send();
})


app.post("/borrarAulasSede", (req, res) => {
	let sede = req.body.sedeBorrar;

	db.query("DELETE FROM AULA WHERE Sede = ?;", [sede], (err, res, f) => {
		if(err) console.log(err)
	})
});

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

	if (Id != null && Capacidad != null && Disponibilidad != null){
		Disponibilidad.split(",").map((d) => {
			db.query("INSERT INTO AULA(Id,Capacidad,Disponibilidad,Sede) VALUES (?,?,?,?);", [Id, Capacidad, d, Sede], (err, res, f) => {
				if (err) console.log(err);
				else console.log('Insercion exitosa del aula')
			})
		})
	}

	res.send();
});

/** =========================================================================
 *  Examenes
 *  =========================================================================
 */

app.post("/nuevosExamenes", async (req, res) => {
	let examenes = req.body.examenes;
	
	db.query("INSERT INTO MATERIA VALUES ?;", [examenes], (err,res,f) => {
		if(err) console.log(err);
	});
});

/** =========================================================================
 *  Personal
 *  =========================================================================
 */


app.post("/nuevoPersonal", (req, res) => {
	let personal = req.body.personal;
	let sede = req.body.sede;
	let disponibilidad = req.body.disponibilidad;
	personal.forEach(r => {
		if (r != '') {
			disponibilidad.forEach(d => {
				db.query("INSERT INTO RESPONSABLE_AULA(Responsable, Sede, Momento) VALUES (?, '"+sede+"', '"+d+"');", [r], (err, res, f) => {
					if (err) console.log(err);
				})
			})
		}
	})
});

app.post("/personalAulas", (req, res) => {
	let sede = req.body.sede;
	dbQuery("SELECT Responsable FROM RESPONSABLE_AULA where Sede = '"+sede+"';", req, res);
});


app.post("/asignarResponsableAula", (req, res) => {
	let aula = req.body.aula;
	let sede = req.body.sede;
	let disponibilidad = req.body.disponibilidad;
	let responsable = req.body.responsable;
	db.query("UPDATE RESPONSABLE_AULA SET Aula = '" + aula + "', Rol = 'Responsable' where Responsable = '" + responsable + "' and Momento = '"+disponibilidad+"' and Sede = '"+sede+"';", (err, res, f) => {
		if (err) console.log(err)
	})
	db.query("UPDATE AULA SET Responsable = '" + responsable + "' where Id = '" + aula + "' and Disponibilidad = '"+disponibilidad+"' and Sede = '"+sede+"';", (err, res, f) => {
		if (err) console.log(err)
	})
	res.send();
})

app.post("/asignarVigilanteAula", (req, res) => {
	let aula = req.body.aula;
	let vigilante = req.body.vigilante;
	let disponibilidad = req.body.disponibilidad;
	let sede = req.body.sede;

	db.query("UPDATE RESPONSABLE_AULA SET Aula = '" + aula + "', Rol = 'Vigilante' where Responsable = '" + vigilante + "' and Momento = '"+disponibilidad+"' and Sede = '"+sede+"';", (err, res, f) => {
		if (err) console.log(err)
	})
	db.query("UPDATE AULA SET Responsable = '" + vigilante + "' where Id = '" + aula + "' and Disponibilidad = '"+disponibilidad+"' and Sede = '"+sede+"';", (err, res, f) => {
		if (err) console.log(err)
	})
	res.send();
})

app.post("/desasignarPersonal", (req, res) => {
	let personal = req.body.personal;
	let aula = req.body.aula;
	let disponibilidad = req.body.disponibilidad;
	let sede = req.body.sede;

	db.query("UPDATE RESPONSABLE_AULA SET Aula = NULL, Rol = NULL WHERE Responsable = '" + personal + "' and Momento = '"+disponibilidad+"' and Sede = '"+sede+"';", (err, res, f) => {
		if (err) console.log(err)
	})

	db.query("UPDATE AULA SET Responsable = NULL WHERE Id = '" + aula + "' and Disponibilidad = '"+disponibilidad+"' and Sede = '"+sede+"';", (err, res, f) => {
		if (err) console.log(err)
	})

	res.send();
})