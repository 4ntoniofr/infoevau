import React from "react";
import "../../assets/css/Responsables.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TablaResponsablesDisponibles from "./TablaResponsablesDisponibles";
import TablaResponsablesSede from "./TablaResponsableSede";
import BotonesResponsables from "./BotonesResponsables";

export default function ResponsablesSede() {

    const [respDispSeleccionado, setRespDispSeleccionado] = useState(null);
    const [sedeSeleccionada, setSedeSeleccionada] = useState(null);
    const [dataRespDisp, setDataRespDisp] = useState([]);
    const [dataSedes, setDataSedes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/responsablesDisponibles").then((responsables) => {
            setDataRespDisp(responsables.data);
        },);

        axios.get("http://localhost:3001/sedes").then((sedes) => {
            setDataSedes(sedes.data);
        });

    }, []);

    return (
        <>
        <div className="containerHeader">
            <h1>Sección de los responsables de sede</h1>
        </div>

        <TablaResponsablesDisponibles 
            data = {dataRespDisp}
            responsableSeleccionado = {respDispSeleccionado}
            setResponsableSeleccionado = {setRespDispSeleccionado}
        />

        <BotonesResponsables 
            respDispSeleccionado = {respDispSeleccionado}
            sedeSeleccionada = {sedeSeleccionada}
            dataRespDisp = {dataRespDisp}
            setDataRespDisp = {setDataRespDisp}
            dataSedes = {dataSedes}
            setDataSedes = {setDataSedes}
        />

        <TablaResponsablesSede 
            data = {dataSedes}
            sedeSeleccionada = {sedeSeleccionada}
            setSedeSeleccionada = {setSedeSeleccionada}
        />

        </>
    )
}