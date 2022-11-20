import React from "react";
import "../assets/css/Aulas.css"
import papelera from "../assets/images/papelera.png";
import aulasServices from "../services/aulasServices";

export default function BotonesAulas ({data, setData, aulaSeleccionada}) {
    return (
        <>
        <div className="containerBotonesAulas">
            <button className="buttonAulas">
                Crear aula
            </button>
            <button className="buttonAulas">
                Modificar aula
            </button>
            <button className="buttonAulas"
                onClick={() => {
                    setData(aulasServices.borrarAula(aulaSeleccionada, data));
                }}>
                <img src={papelera} className="icono" alt="" />
                Borrar aula
            </button>
        </div>
        </>
    )
}