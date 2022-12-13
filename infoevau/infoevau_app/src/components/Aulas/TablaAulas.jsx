import React from "react";

export default function TablaAulas({data, aulaSeleccionada, setAulaSeleccionada}) {

	const seleccionarAula = (aula) => {
		if(aulaSeleccionada === aula) setAulaSeleccionada(null)
		else setAulaSeleccionada(aula)
	}

    return (
        <>
            <div className="containerTablaAulas">
                <table className="tablaAulas">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Capacidad</th>
                            <th>Disponibilidad</th>
                        </tr>
                    </thead>
                        <tbody>
                            {data.map((aula, key) => (
                                <tr
																	key={key} 
																	style={aulaSeleccionada === aula ? { backgroundColor: "#80ff80" } : {}}
																	onClick={() => seleccionarAula(aula)}
																>
                                    <td>{aula.Id}</td>
                                    <td>{aula.Capacidad}</td>
                                    <td>{aula.Disponibilidad.split(",").map((d) => {
																			return <>{d}<br/></>
																		})}</td>
                                </tr>
                            ))}
                        </tbody>

                </table>

            </div>
        </>
    )
}