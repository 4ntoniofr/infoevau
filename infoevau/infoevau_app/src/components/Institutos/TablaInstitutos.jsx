import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function TablaInstitutos() {
    const [institutoSeleccionado, setInstitutoSeleccionado] = useState(null);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      axios.get("http://localhost:3001/institutosDisponibles").then((institutosDisp) => {
        setData(institutosDisp.data);
      });
    }, []);

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
				<h4>&nbsp;&nbsp;&nbsp;&nbsp;Aforo total de la sede: </h4>
				<h4>&nbsp;&nbsp;&nbsp;&nbsp;Total de alumnos seleccionados: {institutoSeleccionado === null? 0 : institutoSeleccionado.NumAlumnos}</h4>
		</div>
		</>
	)
}