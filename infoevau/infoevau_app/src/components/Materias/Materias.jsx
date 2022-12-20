import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import materiaServices from "../../services/materiaServices";
import "../../assets/css/Materias.css";

export default function Materias() {
    const [materias, setMaterias] = useState([]);
    const Papa = require("papaparse");
    
    useEffect(() => {
        axios.get("http://localhost:3001/materias").then((materias) => {
            setMaterias(materias.data);
        })
    }, [])

    return (
        <>
        <div className="containerTituloMaterias">
            <h2>Exámenes insertados</h2>
        </div>
        
        <div className="containerBotonesMaterias">
            <div className='custom-input-file'>
                <input
            className='input-file'
            type="file"
            accept=".csv"
            onChange={(e) => {
                if (e.target.files[0].name.endsWith(".csv")) {
                    Papa.parse(e.target.files[0], {
                        complete: (res, file) => {
                            materiaServices.insertarExamenes(res.data, setMaterias).then(c => {
                                swal({
                                    icon: "success",
                                    title: "Inserción de exámenes correcta",
                                    text: "Se insertaron " + c + " de " + res.data.filter(e => e[0] !== "").length + " exámenes correctamente."
                                });
                            });
                    },
                });
                } else {
                    swal({
                        icon: "error",
                        title: "Formato inválido",
                        text: "El formato del archivo '" + e.target.files[0].name + "' no es válido y no puede importarse."
                    })
                }
            }}
                />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;Importar exámenes
            </div>
        </div>

        <div className="containerTablaMaterias">
            <table className="tablaMaterias">
                <thead>
                    <tr>
                        <th>Materia</th>
                        <th>Horario</th>
                    </tr>
                </thead>
                <tbody>
                    {materias.map((materia, key) => (
                        <tr key={key}>
                            <td>{materia.Nombre}</td>
                            <td>{materia.Tramo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}