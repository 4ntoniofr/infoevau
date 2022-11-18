import React from "react";
// CSS que todavia hay que crear
import "../assets/css/Sedes.css";
import TablaInstitutos from "./TablaInstitutos.jsx"
import BotonesInstitutos from "./BotonesInstitutos"
import { useParams } from "react-router-dom";

export default function InstitutosSede() {
    let params = useParams();
    let idSede = params.idSede.replace("-","/");

    return (<>
        <div className="containerHeader">
            <h1>Institutos de la sede {idSede}</h1>
        </div>
        <TablaInstitutos />
        <BotonesInstitutos />
        <TablaInstitutos />
    </>)
}
