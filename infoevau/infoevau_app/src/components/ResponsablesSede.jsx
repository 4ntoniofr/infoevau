import React from "react";
import "../assets/css/Responsables.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TablaResponsablesDisponibles from "./TablaResponsablesDisponibles";
import BotonesResponsables from "./BotonesResponsables";

export default function ResponsablesSede() {
    let params = useParams();
    let idSede = params.idSede.replace("-","/");

    const [responsableSeleccionado, setResponsableSeleccionado] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/responsables").then((responsables) => {
          setData(responsables.data);
        });
      }, []);

    return (<>
        <div className="containerHeader">
            <h1>Responsables de la sede {idSede}</h1>

            <TablaResponsablesDisponibles 
            data = {data}
            responsableSeleccionado = {responsableSeleccionado}
            setResponsableSeleccionado = {setResponsableSeleccionado}
            />

            <BotonesResponsables 
              data = {data}
              setData = {setData}
              responsableSeleccionado = {responsableSeleccionado}
            />
            
        </div>
    </>)
}