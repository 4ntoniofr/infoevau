import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function TablaInstitutosAsignados ({idSede}) {
    const [institutoSeleccionado, setInstitutoSeleccionado] = useState(null);
    const [dataAsig, setDataAsig] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:3001/institutosAsignados",{
        sede: idSede
      }).then((institutosAsig) => {
        setDataAsig(institutosAsig.data);
      });
    }, []);

    return (
        <>
        <div className="containerTablaInstitutosAsignados">
        <table className="tablaInstitutos">
				<thead>
					<tr>
						<th>Institutos asignados</th>
						<th>Num alumnos</th>
					</tr>
				</thead>
				<tbody>
				{dataAsig.map((instituto,key) => {
					if (instituto.Nombre === institutoSeleccionado) {
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
									setInstitutoSeleccionado(instituto.Nombre);
								}}
							>
							{instituto.Nombre}</td>
							<td
								onClick={() => {
									setInstitutoSeleccionado(instituto.Nombre);
								}}
							>
							{instituto.NumAlumnos}</td>
						</tr>
					);
				})}
				</tbody>
			</table>
        </div>
        </>
    )
}