import React from "react";
import TablaAlumnos from "./TablaAlumnos";
import '../assets/css/Alumnos.css'


export default function Alumnos() {
  return (
    <>
      <h1>Sección de los alumnos</h1>
      <div className="alumnos">
        <TablaAlumnos />
      </div>
    </>
  )
}
