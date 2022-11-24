import axios from "axios";
import swal from 'sweetalert';

const insertarResponsables = (responsables) => {
	axios.post("http://localhost:3001/nuevosResponsables", {
		responsables: responsables.slice(1, responsables.length),
	});
	/*return responsables.slice(1, responsables.length).map((responsable) => {
		return { Nombre: responsable };
	});*/
	return responsables.length;
};

const asignarResponsable = (responsable, sedeselected) => {

	axios.post("http://localhost:3001/asignarResponsable", {
		responsable: responsable,
		sede: sedeselected
	});
	/*dataSedes.push({Nombre: sedeselected.Nombre, Responsable: responsable.Nombre});
	setDataSedes(dataSedes);
	return dataRespDisp.filter((r) => r !== responsable);*/
};

const desasignarResponsable = (sedeselected, responsableMemoria, dataResponsablesSede, setDataResponsablesSede, dataResponsablesAsignados, setDataResponsablesAsignados) => {
	if(dataResponsablesSede){
		axios.post("http://localhost:3001/desasignarResponsable", {
			sede: sedeselected
		});
		setDataResponsablesSede(null)
		setDataResponsablesAsignados(dataResponsablesAsignados.filter((responsable) => responsable.Nombre !== sedeselected));
		responsableMemoria.push(dataResponsablesSede)
		responsableMemoria.sort()
		return(responsableMemoria)
	}else{
		swal({
			icon: "error",
			title: "Error",
			text: "La sede seleccionada no tiene responsable asignado." 
		});
		return responsableMemoria;
	}
}

const responsablesServices = {insertarResponsables, asignarResponsable, desasignarResponsable}

export default responsablesServices;