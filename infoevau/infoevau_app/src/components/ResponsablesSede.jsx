import React from "react";
import "../assets/css/Responsables.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TablaResponsablesDisponibles from "./TablaResponsablesDisponibles";
import BotonesResponsables from "./BotonesResponsables";
import TablaResponsablesSede from "./TablasResponsableSede";

export default function ResponsablesSede() {
    let params = useParams();
    let idSede = params.idSede.replace("-","/");

    const [responsableSeleccionado, setResponsableSeleccionado] = useState(null);
    const [responsableSedeSeleccionado, setResponsableSedeSeleccionado] = useState([]);
    const [data, setData] = useState([]);
    const [dataResponsablesSede, setDataResponsablesSede] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/responsables").then((responsables) => {
          setData(responsables.data);
        },);

        axios.post("http://localhost:3001/responsablesSede", {
          sede: idSede
        }).then((responsablesSede) => {
          setDataResponsablesSede([responsablesSede.data[0]]);
        },);
    
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
              responsableSedeSeleccionado = {responsableSedeSeleccionado}
              sede= {idSede}
            />

            <TablaResponsablesSede
              data = {dataResponsablesSede}
              responsableSedeSeleccionado = {responsableSedeSeleccionado}
              setResponsableSedeSeleccionado = {setResponsableSedeSeleccionado}
            />

        </div>
    </>)
}