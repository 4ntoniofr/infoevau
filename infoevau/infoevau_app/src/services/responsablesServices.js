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

const asignarResponsable = (responsable, sedeselected, responsablesMemoria, responsableSede, setResponsablesSede) => {
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

const desasignarResponsable = (sedeselected, responsableMemoria, dataResponsablesSede, setDataResponsablesSede, responsableSedeSeleccionado, setResponsableSedeSeleccionado, setResponsableSeleccionado) => {
	console.log(responsableSedeSeleccionado)
	if(dataResponsablesSede){
		axios.post("http://localhost:3001/desasignarResponsable", {
			sede: sedeselected
		});
		setDataResponsablesSede(null)
		setResponsableSedeSeleccionado(null)
		setResponsableSeleccionado(null)
		responsableMemoria.push(responsableSedeSeleccionado)
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