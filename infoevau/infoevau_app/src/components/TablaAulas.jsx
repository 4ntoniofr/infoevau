import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TablaAulas () {
const [data, setData] = useState([]);

useEffect(() => {
    axios.get("http://localhost:3001/aulas").then((aulas) => {
    setData(aulas.data);
    });
}, []);

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
                    <tbody>
                        {data.map((aula, key) => (
                            <tr key={key}>
                                <td>{aula.ID}</td>
                                <td>{aula.Capacidad}</td>
                                <td>{aula.Disponibilidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </thead>

            </table>

        </div>
        </>
    )
}