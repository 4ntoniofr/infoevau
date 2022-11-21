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

const asignarResponsable = (responsable, sedeselected, responsablesMemoria, responsableSede, setResponsablesSede, dataResponsablesAsignados, setDataResponsablesAsignados, idSede) => {
	if(responsable){
		if(responsableSede){
			swal({
				icon: "error",
				title: "Error",
				text: "Solo se puede tener un representante por sede, si quiere cambiar de representante, desasigne el actual primero." 
			});
			return responsablesMemoria;
		}else{
			axios.post("http://localhost:3001/asignarResponsable", {
				responsable: responsable,
				sede: sedeselected
			});
			dataResponsablesAsignados.push({Nombre: idSede, Responsable: responsable});
			setDataResponsablesAsignados(dataResponsablesAsignados);
			setResponsablesSede(responsable)
			return responsablesMemoria.filter((responsableMemoria) => responsableMemoria !== responsable);
		}
	}else{
		swal({
			icon: "error",
			title: "Error",
			text: "No se ha seleccionado el responsable." 
		});
		return responsablesMemoria;
	}
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