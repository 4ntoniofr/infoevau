import React from "react";
import TablaAlumnos from "./TablaAlumnos";
import BotonesAlumnos from "./BotonesAlumnos";
import "../../assets/css/Alumnos.css";
import { useState } from "react";

export default function Alumnos() {
	const [data, setData] = useState({});
	const [dataBD, setDataBD] = useState([]);

  return (
    <>
      <div className="containerHeaderAlumnos">
        <h1>Sección de los alumnos</h1>
      </div>
      <div className="alumnos">
        <BotonesAlumnos data={data} setData={setData} setDataBD={setDataBD}/>
				<TablaAlumnos data={dataBD} setData={setDataBD}/>
      </div>
    </>
  );
}
