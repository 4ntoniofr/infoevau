import React from "react";
import { useParams } from "react-router-dom";
import "../assets/css/Aulas.css"
import TablaAulas from "./TablaAulas"

export default function AulasSede () {
    let params = useParams();
    let idSede = params.idSede.replace("-","/");

    return (
        <>
        <div className="containerHeader">
            <h2>Aulas de la sede {idSede}</h2>
        </div>
        <TablaAulas />
        </>
    )
}