import axios from "axios";
import Axios from "axios";

let logErrores = 'LOG DE ERRORES\n';

const insertarAlumnos = async (alumnos) => {
	const MAX_ENVIO = 500;
	let institutos = []
	let institutosInclude = []
	let matriculaciones = []
	let alumnosIncluidos = []
	let alumnosInsercion = []
	let matriculacionesIncluidas = []
	let materiasIncluidas = []

	//recogemos la informacion almacenada en BD
	await Axios.get("http://localhost:3001/materias").then((ms) => materiasIncluidas = ms.data)
	await Axios.get("http://localhost:3001/alumnos").then((als) => alumnosIncluidos = als.data)
	await Axios.get("http://localhost:3001/matriculas").then((mats) => matriculacionesIncluidas = mats.data)
	await Axios.get("http://localhost:3001/institutos").then((ins) => institutos = ins.data)
	institutos.push({Nombre: ''})
	
	alumnos.forEach(a => {
		//comprobamos si el alumno ya esta incluido en la BD o si el formato del NIF es incorrecto
		if(alumnosIncluidos.find(ai => ai.NIF === a[4]) !== undefined){
			logErrores = logErrores + 'Ya se encontró un alumno con el mismo indentificador: ' + a[4] + ' en el alumno ' + a + '\n';
		}else if(!formatoCorrecto(a[4])){
			logErrores += 'El NIF: ' + a[4] + ' tiene un formato incorrecto. ' + a + '\n';
		}else{
			//almacenamos en institutosInclude los institutos que no estan en la BD
			if(institutos.find(i => i.Nombre === a[0]) === undefined){
				institutos.push({Nombre: a[0]})
				institutosInclude.push([a[0]])
			}

			//almacenamos en matriculaciones todos los pares (<asignatura>,<alumno>) si se da que no este ya matriculado
			let asignaturas = a.pop()	//elimina el ultimo elemento y lo devuelve
			asignaturas.split(', ').forEach((asig) => {
				if(matriculacionesIncluidas.find(m => (m.NIF === a[4] && m.Materia === asig)) !== undefined){
					logErrores += 'El alumno identificado por el NIF ' + a[4] + ' ya se encuentra matriculado en ' + asig + a + '\n';
				}else if(materiasIncluidas.find(m => m.Nombre === asig) === undefined){
					logErrores += 'La materia ' + asig + ' no se encuentra dentro de la lista de materias. ' + a + asignaturas + '\n';
				}else{
					matriculaciones.push([asig, a[4]]);
				}
			});

			//incluimos el alumno a la lista de insercion
			alumnosInsercion.push(a)
		}
	});

	if(institutosInclude.length > 0){
		Axios.post("http://localhost:3001/nuevosInstitutos", {
			institutos: institutosInclude,
		});
	}

	for (var i = 0; i * MAX_ENVIO < alumnosInsercion.length; i++) {
		await Axios.post("http://localhost:3001/nuevosAlumnos", {
			alumnos: alumnosInsercion.slice(i * MAX_ENVIO, (i+1) * MAX_ENVIO),
		});
	}

	for (var j = 0; j * MAX_ENVIO < matriculaciones.length; j++) {
		await Axios.post("http://localhost:3001/nuevasMatriculaciones", {
			matriculaciones: matriculaciones.slice(j * MAX_ENVIO, (j+1) * MAX_ENVIO),
		});
	}

	return alumnosInsercion.length;
};

const formatoCorrecto = (nif) => {
	// eslint-disable-next-line no-useless-escape
	const regExp = /\d{8}[A-Z]|[A-Z]\d{7}[A-Z]/
	return regExp.test(nif);
}

const generarFichero = () => {
	const blob = new Blob([logErrores], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.download = "log.txt";
	link.href = url;
	link.click();
}

const insertarExamenes = (examenes) => {
	axios.post("http://localhost:3001/nuevosExamenes", {
		examenes: examenes
	});
}

const alumnoServices = { logErrores, insertarAlumnos, generarFichero, insertarExamenes }

export default alumnoServices;