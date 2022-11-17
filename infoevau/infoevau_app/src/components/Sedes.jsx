import React from "react";
import Axios from 'axios';
import TablaSedes from "./TablaSedes";
import BotonesSedes from "./BotonesSedes"
import "../assets/css/Sedes.css";

export default function Sedes() {
	return <>
		<div className="containerHeader">
			<h1>Sección de las sedes</h1>
		</div>
		<TablaSedes />
		<BotonesSedes />
	</>;
}
