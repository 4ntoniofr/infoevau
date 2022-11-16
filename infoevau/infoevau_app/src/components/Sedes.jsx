import React from "react";
import Axios from 'axios';

export default function Sedes() {
	const insertarSedes = (sedes) => {
		console.log(sedes)
		Axios.post('http://localhost:3001/nuevasSedes', {
			sedes: sedes.slice(1, sedes.length)
		})
	}

	return <>
		<h1>Sección de las sedes</h1>
		<input type="file" accept=".txt" onChange={e => {
			e.target.files[0].text().then((t) => {
				insertarSedes(t.split('\n'));
			});
		}} />
	</>;
}
