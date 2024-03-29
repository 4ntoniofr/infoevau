import React from "react";

export default function TablaAulasSeparadas({data, aulaSeleccionada, setAulaSeleccionada}) {

	const seleccionarAula = (aula) => {
		if(aulaSeleccionada === aula) setAulaSeleccionada(null)
		else setAulaSeleccionada(aula)
	}

    return (
        <>
            <div className="containerAulasSede">
                <table className="tablaAulas">
                    <thead>
                        <tr>
                            <th>ID</th>
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
                                    <td>{aula.Disponibilidad}</td>
                                </tr>
                            ))}
                        </tbody>
                </table>

            </div>
        </>
    )
}