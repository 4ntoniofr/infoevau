import React from "react";
import institutosServices from "../../services/institutosServices";
import sedesServices from "../../services/sedesServices";

export default function BotonesInstitutos({
	idSede,
	dataAsig,
	setDataAsig,
	dataDisp,
	setDataDisp,
	institutoSeleccionadoDisp,
	setInstitutoSeleccionadoDisp,
	institutoSeleccionadoAsig,
	setInstitutoSeleccionadoAsig
}) {

	const compare = (a,b) => {
		if(a<b) return -1;
		else if(a>b) return 1;
		else return 0;
	}

	return (
		<>
		<div className="containerBotonesInstitutos">
			<button
				className="buttonInstitutos"
				onClick={() => {
					if(!institutoSeleccionadoDisp) alert("No instituto disponible seleccionado")
					else{
						institutosServices.asignarSede(institutoSeleccionadoDisp, idSede);
						setDataDisp(dataDisp.filter(i => i !== institutoSeleccionadoDisp));
						dataAsig.push(institutoSeleccionadoDisp);
						setDataAsig(dataAsig.sort((a,b) => compare(a.Nombre,b.Nombre)));
						setInstitutoSeleccionadoDisp(null);
					}
				}}
			>Asignar instituto</button>
			<br/>
			<br/>
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
			<br/>
			<br/>
			<button className="buttonInstitutos" onClick={() => {sedesServices.abrirAulasSede(idSede)}}>Gestionar Aulas</button>
		</div>
		</>
	)
}