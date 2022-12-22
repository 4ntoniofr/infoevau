import axios from "axios";
import { useState, useEffect } from "react";

export default function TablaInstitutos({idSede, data, dataAsig, institutoSeleccionado, setInstitutoSeleccionado, asignadoSelec, capacidadSede, setCapacidadSede}) {
		
  
    useEffect(() => {
      axios.post("http://localhost:3001/aforoSede", {
			sede: idSede
			}).then(c => {
				let aforo = 0;
				for (var i = 0; i < c.data.length; i++) {
					aforo += c.data[i].Capacidad;
				}
				setCapacidadSede(aforo)} 
			);
    }, []);

		const alumnosSede = () => {
			let nAlumnos = 0;
			dataAsig.forEach(i => nAlumnos += i.NumAlumnos);
			return nAlumnos;
		}

		const totalAlumnos = () => {
			let n = alumnosSede();
			if(institutoSeleccionado) n += institutoSeleccionado.NumAlumnos;
			if(asignadoSelec) n -= asignadoSelec.NumAlumnos;
			return n;
		}

	return (
		<>
		<div className="containerTablaInstitutos">
			<table className="tablaInstitutos">
				<thead>
					<tr>
						<th>Institutos no asignados</th>
						<th>Num alumnos</th>
					</tr>
				</thead>
				<tbody>
				{data.map((instituto,key) => {
					if (instituto === institutoSeleccionado) {
						console.log("Instituto seleccionado: " + instituto.Nombre);
						return (
							<tr key={key} style={{ backgroundColor: "#80ff80" }}>
                    			<td
                      				onClick={() => {
                        				setInstitutoSeleccionado(null);
                      				}}
                    			>
                      			{instituto.Nombre}</td>
								<td
									onClick={() => {
										setInstitutoSeleccionado(null);
									}}
								>
								{instituto.NumAlumnos}</td>
                  			</tr>
						);
					}
					return (
						<tr key={key}>
							<td
								onClick={() => {
									setInstitutoSeleccionado(instituto);
								}}
							>
							{instituto.Nombre}</td>
							<td
								onClick={() => {
									setInstitutoSeleccionado(instituto);
								}}
							>
							{instituto.NumAlumnos}</td>
						</tr>
					);
				})}
				</tbody>
			</table>
		</div>
		<div className="containerAforoInstitutos">
				<h4>&nbsp;&nbsp;&nbsp;&nbsp;Aforo total de la sede: {capacidadSede === null? 0 : capacidadSede}</h4>
				<h4>&nbsp;&nbsp;&nbsp;&nbsp;Total de alumnos en sede: {alumnosSede() + 
				(institutoSeleccionado ? (" + " + institutoSeleccionado.NumAlumnos):"") + 
				(asignadoSelec ? (" - " + asignadoSelec.NumAlumnos):"") +
				((institutoSeleccionado || asignadoSelec) ?  (" = " + totalAlumnos()):"")}</h4>
		</div>
		</>
	)
}