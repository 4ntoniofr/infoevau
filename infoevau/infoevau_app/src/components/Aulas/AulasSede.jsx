import React from "react";
import { useParams } from "react-router-dom";
import "../../assets/css/Aulas.css"
import TablaAulas from "./TablaAulas"
import BotonesAulas from "./BotonesAulas";
import axios from "axios"
import { useState, useEffect } from "react";

export default function AulasSede() {
    let params = useParams();
    let idSede = params.idSede.replace("$","/");

    const [aulaSeleccionada, setAulaSeleccionada] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:3001/aulas", { sede: idSede }).then((a) => {
            setData(a.data);
            console.log(a.data);
        });
    }, [idSede]);

    return (
        <>
            <div className="containerHeader">
                <h2>Aulas de la sede {idSede}</h2>
            </div>
            <TablaAulas
                data={data}
                aulaSeleccionada={aulaSeleccionada}
                setAulaSeleccionada={setAulaSeleccionada}
            />
            <BotonesAulas
                data={data}
                setData={setData}
                aulaSeleccionada={aulaSeleccionada}
                idSede={idSede}
            />

        </>
    )
}