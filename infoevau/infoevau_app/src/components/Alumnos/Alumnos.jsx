import React from "react";
import TablaAlumnos from "./TablaAlumnos";
import BotonesAlumnos from "./BotonesAlumnos";
import "../../assets/css/Alumnos.css";
import { useState } from "react";

export default function Alumnos() {
	const [data, setData] = useState({});

  return (
    <>
      <div className="containerHeaderAlumnos">
        <h1>Sección de los alumnos</h1>
      </div>
      <div className="alumnos">
        <BotonesAlumnos data={data} setData={setData}/>
				<TablaAlumnos />
      </div>
    </>
  );
}
