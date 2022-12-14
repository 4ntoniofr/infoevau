import React from "react";

export default function TablaPersonal({data, personalSeleccionado, setPersonalSeleccionado}) {

	const seleccionarPersonal = (personal) => {
		if(personalSeleccionado === personal) setPersonalSeleccionado(null)
		else setPersonalSeleccionado(personal)
	}

    return (
        <>
            <div className="containerTablaPersonal">
                <table className="tablaPersonal">
                    <thead>
                        <tr>
                            <th>Personal</th>
                            <th>Horario</th>
                            <th>Aula</th>
                            <th>Examen</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                        <tbody>
                            {data.map((personal, key) => (
                                <tr
																	key={key} 
																	style={personalSeleccionado === personal ? { backgroundColor: "#80ff80" } : {}}
																	onClick={() => {seleccionarPersonal(personal)}}
																>
                                    <td>{personal.Responsable}</td>
                                    <td>{personal.Momento}</td>
                                    <td>{personal.Aula}</td>
                                    <td>{personal.Examen}</td>
                                    <td>{personal.Rol}</td>
                                </tr>
                            ))}
                        </tbody>

                </table>

            </div>
        </>
    )
}