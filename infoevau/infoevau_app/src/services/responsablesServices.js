import axios from "axios";

const insertarResponsables = (responsables) => {
	axios.post("http://localhost:3001/nuevosResponsables", {
		responsables: responsables.slice(1, responsables.length),
	});
	/*return responsables.slice(1, responsables.length).map((responsable) => {
		return { Nombre: responsable };
	});*/
	return responsables.length;
};

const asignarResponsable = (responsable, sedeselected, setDataRespDisp, setDataSedes, dataSedes, dataRespDisp) => {

	axios.post("http://localhost:3001/asignarResponsable", {
		responsable: responsable,
		sede: sedeselected
	});

	setDataRespDisp(dataRespDisp.filter((r) => r !== responsable))

	axios.get("http://localhost:3001/sedes").then((sede) => {
		setDataSedes(sede.data);
  	});
	
	/*dataSedes.push({Nombre: sedeselected.Nombre, Responsable: responsable.Nombre});
	setDataSedes(dataSedes);*/
};

const desasignarResponsable = (sedeselected, setDataSedes, setDataRespDisp) => {
	axios.post("http://localhost:3001/desasignarResponsable", {
		sede: sedeselected.Nombre
	});

	axios.get("http://localhost:3001/responsablesDisponibles").then((responsable) => {
      setDataRespDisp(responsable.data);
  	});

	axios.get("http://localhost:3001/sedes").then((sede) => {
		setDataSedes(sede.data);
	});
}

const responsablesServices = {insertarResponsables, asignarResponsable, desasignarResponsable}

export default responsablesServices;