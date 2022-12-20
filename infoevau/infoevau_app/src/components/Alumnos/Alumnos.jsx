import React from "react";
import TablaAlumnos from "./TablaAlumnos";
import BotonesAlumnos from "./BotonesAlumnos";
import axios from "axios";
import swal from "sweetalert";
import "../../assets/css/Alumnos.css";
import { useState, useEffect } from "react";

export default function Alumnos() {
  const [data, setData] = useState({});
  const [dataBD, setDataBD] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="containerHeaderAlumnos">
        <h2>Sección de los alumnos</h2>
      </div>
      <div className="alumnos">
        <BotonesAlumnos
          data={data}
          setData={setData}
          setDataBD={setDataBD}
          setMatriculas={setMatriculas}
          loading={loading}
          setLoading={setLoading}
        />
        <TablaAlumnos
          data={dataBD}
          setData={setDataBD}
          matriculas={matriculas}
          setMatriculas={setMatriculas}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </>
  );
}
