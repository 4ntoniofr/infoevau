import React from "react";
import "../../assets/css/Institutos.css";
import TablaInstitutos from "./TablaInstitutos.jsx"
import BotonesInstitutos from "./BotonesInstitutos"
import { useParams } from "react-router-dom";
import TablaInstitutosAsignados from "./TablaInstitutosAsignados";

export default function InstitutosSede() {
    let params = useParams();
    let idSede = params.idSede.replace("$","/");

    return (
    <>
        <div className="containerHeaderInstitutos">
            <h2>Institutos asignados a la sede {idSede}</h2>
        </div>
        <TablaInstitutos />
        <BotonesInstitutos />
        <TablaInstitutosAsignados 
          idSede={idSede}/>
    </>)
}
