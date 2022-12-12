import React from "react";
import sedesServices from "../../services/sedesServices";

export default function BotonesInstitutos({idSede}) {
	return (
		<>
		<div className="containerBotonesInstitutos">
			<button className="buttonInstitutos">Asignar instituto</button>
			<br/>
			<br/>
			<button className="buttonInstitutos">Desasignar instituto</button>
			<br/>
			<br/>
			<button className="buttonInstitutos" onClick={() => {sedesServices.abrirAulasSede(idSede)}}>Gestionar Aulas</button>
		</div>
		</>
	)
}