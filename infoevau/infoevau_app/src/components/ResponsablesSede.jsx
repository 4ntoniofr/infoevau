import React from "react";
import "../assets/css/Responsables.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TablaResponsablesDisponibles from "./TablaResponsablesDisponibles";

export default function ResponsablesSede() {
    let params = useParams();
    let idSede = params.idSede;

    const [responsableSeleccionado, setResponsableSeleccionado] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/responsables").then((responsables) => {
          setData(responsables.data);
        });
      }, []);

    const insertarResponsables = (responsables) => {
        axios.post("http://localhost:3001/nuevosResponsables", {
          responsables: responsables.slice(1, responsables.length),
        });
        return responsables.slice(1, responsables.length).map((responsable) => {
          return { Nombre: responsable };
        });
      };

    return (<>
        <div className="containerHeader">
            <h1>Responsables de la sede {idSede}</h1>

            <TablaResponsablesDisponibles 
            data = {data}
            responsableSeleccionado = {responsableSeleccionado}
            setResponsableSeleccionado = {setResponsableSeleccionado}
            />

            <input
                className="button"
                type="file"
                accept=".txt"
                onChange={(e) => {
                    e.target.files[0].text().then((t) => {
                    setData(insertarResponsables(t.split("\n")));
                });
            }}
        />
            
        </div>
    </>)
}