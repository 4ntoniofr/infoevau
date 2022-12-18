import React from "react";
import swal from "sweetalert";
import institutosServices from "../../services/institutosServices";
import sedesServices from "../../services/sedesServices";
import "../../assets/css/Institutos.css";

export default function BotonesInstitutos({
	idSede,
	dataAsig,
	setDataAsig,
	dataDisp,
	setDataDisp,
	institutoSeleccionadoDisp,
	setInstitutoSeleccionadoDisp,
	institutoSeleccionadoAsig,
	setInstitutoSeleccionadoAsig,
	capacidadSede
}) {

	const alumnosSede = () => {
		let nAlumnos = 0;
		dataAsig.forEach(i => nAlumnos += i.NumAlumnos);
		return nAlumnos;
	}

	const compare = (a,b) => {
		if(a<b) return -1;
		else if(a>b) return 1;
		else return 0;
	}

	return (
		<>
		<div className="containerBotonesInstitutos">
			{institutoSeleccionadoDisp === null ?
				<button className="pseudoDisabledButtonInstitutos"
				onClick={() => {
					swal({
						icon: "info",
						title: "Ningun instituto seleccionado"
					})
				}}>Asignar instituto</button>
				:
				<button
				className="buttonInstitutos"
				onClick={() => {
					if(!institutoSeleccionadoDisp) alert("No instituto disponible seleccionado")
					else{
						if (institutoSeleccionadoDisp.NumAlumnos + alumnosSede() <= capacidadSede) {
							institutosServices.asignarSede(institutoSeleccionadoDisp, idSede);
							setDataDisp(dataDisp.filter(i => i !== institutoSeleccionadoDisp));
							dataAsig.push(institutoSeleccionadoDisp);
							setDataAsig(dataAsig.sort((a,b) => compare(a.Nombre,b.Nombre)));
							setInstitutoSeleccionadoDisp(null);
						} else {
							swal({
								icon: "info",
								title: "No se puede realizar la asignación",
								text: "No hay aforo suficiente en esta sede. Puede definir nuevas aulas o reasignar los institutos."
							})
						}
					}
				}}
				>Asignar instituto</button>
			}

			{institutoSeleccionadoAsig === null? 
				<button className="pseudoDisabledButtonInstitutos"
				onClick={() => {
					swal({
						icon: "info",
						title: "Ningun instituto seleccionado"
					})
				}}>Desasignar instituto</button>
				:
				<button
				className="buttonInstitutos"
				onClick={() => {
					if(!institutoSeleccionadoAsig) alert("No instituto asignado seleccionado")
					else{
						institutosServices.desasignarSede(institutoSeleccionadoAsig);
						setDataAsig(dataAsig.filter(i => i !== institutoSeleccionadoAsig));
						dataDisp.push(institutoSeleccionadoAsig);
						setDataDisp(dataDisp.sort((a,b) => compare(a.Nombre,b.Nombre)));
						setInstitutoSeleccionadoAsig(null);
					}
				}}
				>Desasignar instituto</button>
			}

			<button className="buttonInstitutos" onClick={() => {sedesServices.abrirAulasSede(idSede)}}>Gestionar Aulas</button>
			<button className="buttonInstitutos" onClick={() => {sedesServices.abrirSede(idSede)}}>Volver</button>
		</div>
		</>
	)
}