import React from "react";
import TablaAlumnos from "./TablaAlumnos";
import BotonesAlumnos from "./BotonesAlumnos";
import "../assets/css/Alumnos.css";
import { useState } from "react";

export default function Alumnos() {
	const [data, setData] = useState({});

  return (
    <>
      <h1>Sección de los alumnos</h1>
      <div className="alumnos">
        <BotonesAlumnos data={data} setData={setData}/>
				<TablaAlumnos />
      </div>
    </>
  );
}
