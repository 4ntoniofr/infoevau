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

	setDataRespDisp(dataRespDisp.filter((r) => r !== responsable));

	dataSedes.find(s => s.Nombre === sedeselected.Nombre).Responsable = responsable.Nombre;
	setDataSedes(dataSedes);
};

const desasignarResponsable = (sedeselected, dataSedes, setDataSedes, dataRespDisp, setDataRespDisp) => {
	axios.post("http://localhost:3001/desasignarResponsable", {
		sede: sedeselected.Nombre
	});

	dataRespDisp.push({Nombre: sedeselected.Responsable});
	dataRespDisp.sort(function (a, b) {
		if (a.Nombre > b.Nombre) {
			return 1;
		}else if (a.Nombre < b.Nombre) {
			return -1;
		}else return 0;
	});
	setDataRespDisp(dataRespDisp);

	dataSedes.find(s => s.Nombre === sedeselected.Nombre).Responsable = null;
	setDataSedes(dataSedes);
}

const responsablesServices = {insertarResponsables, asignarResponsable, desasignarResponsable}

export default responsablesServices;