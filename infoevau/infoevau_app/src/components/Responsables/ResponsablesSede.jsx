import React from "react";
import "../../assets/css/Responsables.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TablaResponsablesDisponibles from "./TablaResponsablesDisponibles";
import BotonesResponsables from "./BotonesResponsables";
import TablaResponsablesSede from "./TablasResponsableSede";

export default function ResponsablesSede() {
    let params = useParams();
    let idSede = params.idSede.replace("$","/");

    const [responsableSeleccionado, setResponsableSeleccionado] = useState(null);
    const [responsableSedeSeleccionado, setResponsableSedeSeleccionado] = useState(null);
    const [data, setData] = useState([]);
    const [dataResponsablesSede, setDataResponsablesSede] = useState(null)
    const [dataResponsablesAsignados, setDataResponsablesAsignados] = useState([])
    

    useEffect(() => {
        axios.get("http://localhost:3001/responsablesDisponibles").then((responsables) => {
          const array = []
          responsables.data.map( responsable => array.push(responsable.Nombre))
          setData(array);
        },);

        axios.post("http://localhost:3001/responsablesSede", {
          sede: idSede
        }).then((responsablesSede) => {
          setDataResponsablesSede(responsablesSede.data[0].Responsable);
        },);
        
        axios.get("http://localhost:3001/responsablesAsignados").then((responsablesAsignados) => {
          const array = []
          responsablesAsignados.data.map(r => array.push(r))
          setDataResponsablesAsignados(array);
        },);

      }, [idSede]);

    return (<>
        <div className="containerHeader">

            {dataResponsablesSede ? 
            <h2 className="labelResponasble">
              El responsable de {idSede} es <label>{dataResponsablesSede}</label>
            </h2>
             : 
            <h2 className="labelResponasble">
              La sede {idSede} no tiene Responsable
            </h2>}

            <TablaResponsablesDisponibles 
            data = {data}
            responsableSeleccionado = {responsableSeleccionado}
            setResponsableSeleccionado = {setResponsableSeleccionado}
            />

            <BotonesResponsables 
              data = {data}
              setData = {setData}
              dataResponsablesSede = {dataResponsablesSede}
              setDataResponsablesSede = {setDataResponsablesSede}
              responsableSeleccionado = {responsableSeleccionado}
              responsableSedeSeleccionado = {responsableSedeSeleccionado}
              setResponsableSedeSeleccionado = {setResponsableSedeSeleccionado}
              setResponsableSeleccionado = {setResponsableSeleccionado}
              dataResponsablesAsignados = {dataResponsablesAsignados}
              setDataResponsablesAsignados = {setDataResponsablesAsignados}
              sede= {idSede}
            />

            <TablaResponsablesSede
              data = {dataResponsablesAsignados}
              setData = {setDataResponsablesAsignados}
            />

        </div>
    </>)
}