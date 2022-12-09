import React from "react";
import { useParams } from "react-router-dom";
import pizarra from "../../assets/images/pizarra.png";

export default function GestionSede() {
    let params = useParams();
    let idSede = params.idSede.replace("$","/");

    return (
        <>
        <div className="containerHeaderGestionSedes">
            <h2>Sede '{idSede}'</h2>
        </div>
        <div className="containerBotonesSedes">
            <div className="custom-input-file">
            <input
                className="input-file"
                type="file"
                accept=".txt"
                name="Importar personal"
                onChange={(e) => {
                }}
            />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Importar personal
            </div>
        </div>
        </>
    )
    //<img src={pizarra} className="icono" alt="" />
}