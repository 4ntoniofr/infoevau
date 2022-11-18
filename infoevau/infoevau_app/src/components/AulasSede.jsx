import React from "react";
import { useParams } from "react-router-dom";

export default function AulasSede () {
    let params = useParams();
    let idSede = params.idSede.replace("-","/");

    return (
        <>
        <h2>Aulas de la sede {idSede}</h2>
        </>
    )
}