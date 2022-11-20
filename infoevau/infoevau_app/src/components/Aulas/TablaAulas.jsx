import React from "react";

export default function TablaAulas({data, aulaSeleccionada, setAulaSeleccionada}) {

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
                                <tr key={key}>
                                    <td>{aula.Id}</td>
                                    <td>{aula.Capacidad}</td>
                                    <td>{aula.Disponibilidad}</td>
                                </tr>
                            ))}
                        </tbody>

                </table>

            </div>
        </>
    )
}