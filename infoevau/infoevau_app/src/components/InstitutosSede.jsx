import React from "react";
// CSS que todavia hay que crear
import "../assets/css/Sedes.css";
import TablaInstitutos from "./TablaInstitutos.jsx"
import BotonesInstitutos from "./BotonesInstitutos"
import { useState } from "react";

export default function InstitutosSedes() {

	return <>
		<div className="containerHeader">
			<h1>Institutos de la sede "PONER SEDE QUE SEA"</h1>
		</div>
		<TablaInstitutos />
		<BotonesInstitutos />
        <TablaInstitutos />
	</>;
}
