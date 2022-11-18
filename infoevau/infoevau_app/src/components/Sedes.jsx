import React from "react";
import Axios from 'axios';
import TablaSedes from "./TablaSedes";
import BotonesSedes from "./BotonesSedes"
import "../assets/css/Sedes.css";
import { useState } from "react";

export default function Sedes() {

	const [sedeSeleccionada, setSedeSeleccionada] = useState(null);

	return <>
		<div className="containerHeader">
			<h1>Sección de las sedes</h1>
		</div>
		<TablaSedes setSedeSeleccionada={setSedeSeleccionada}/>
		<BotonesSedes sedeSeleccionada={sedeSeleccionada}/>
	</>;
}
