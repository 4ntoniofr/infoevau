import axios from "axios";
import Axios from "axios";

const insertarExamenes = async (examenes, setMaterias) => {
	let materiasDB = [];
	let examenesInsertar = [];
	await Axios.get("http://localhost:3001/materias").then((materias) => materiasDB = materias.data);

	examenes.forEach(e => {
		if(!materiasDB.find(m => m.Nombre === e[0]) && e[0] !== "") examenesInsertar.push([e[0], e[1].substring(1)]);
	});
	
	Axios.post("http://localhost:3001/nuevosExamenes", {
		examenes: examenesInsertar
	});

	await axios.get("http://localhost:3001/materias").then((m) => setMaterias(m.data));

	return examenesInsertar.length;
}

const materiaServices = { insertarExamenes }

export default materiaServices