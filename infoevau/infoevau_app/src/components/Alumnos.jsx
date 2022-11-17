import React from "react";
import Axios from "axios";
import TablaAlumnos from "./TablaAlumnos";
import "../assets/css/Alumnos.css";
import { useState } from "react";

export default function Alumnos() {
	const insertarAlumnos = async (alumnos) => {
		const MAX_ENVIO = 500;
		let institutos = []
		let institutosInclude = []
		let matriculaciones = []

		await Axios.get("http://localhost:3001/institutos").then((ins) => institutos = ins.data)
		institutos.push({Nombre: ''})
		
		alumnos.forEach(a => {
			if(institutos.find(i => i.Nombre == a[0]) == undefined){
				institutos.push({Nombre: a[0]})
				institutosInclude.push([a[0]])
			}

			let asignaturas = a.pop()	//elimina el ultimo elemento y lo devuelve
			asignaturas.split(', ').forEach((asig) => {
				matriculaciones.push([asig, a[4]]);
			});
		});

		console.log(alumnos)
		console.log(matriculaciones)

		if(institutosInclude.length > 0){
			Axios.post("http://localhost:3001/nuevosInstitutos", {
				institutos: institutosInclude,
			});
		}

    for (var i = 0; i * MAX_ENVIO < alumnos.length; i++) {
      await Axios.post("http://localhost:3001/nuevosAlumnos", {
        alumnos: alumnos.slice(i * MAX_ENVIO, i * MAX_ENVIO + MAX_ENVIO),
      });
    }

		for (var i = 0; i * MAX_ENVIO < matriculaciones.length; i++) {
      await Axios.post("http://localhost:3001/nuevasMatriculaciones", {
        matriculaciones: matriculaciones.slice(i * MAX_ENVIO, i * MAX_ENVIO + MAX_ENVIO),
      });
    }
  };

  const Papa = require("papaparse");
  const [data, setData] = useState({});

  return (
    <>
      <h1>Sección de los alumnos</h1>
      <div className="alumnos">
        <div className="buttons">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              Papa.parse(e.target.files[0], {
                complete: (res, file) => {
                  setData(res);
                },
              });
            }}
          />
          <button
            onClick={() => {
              insertarAlumnos(data.data.slice(1, data.data.length));
            }}
          >
            Guardar informacion
          </button>
          <TablaAlumnos />
        </div>
      </div>
    </>
  );
}
