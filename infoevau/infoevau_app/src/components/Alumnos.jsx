import React from "react";
import Axios from 'axios';
import TablaAlumnos from "./TablaAlumnos";
import '../assets/css/Alumnos.css';
import { useState } from "react";


export default function Alumnos() {
	
	const insertarAlumnos = async (alumnos) => {
		/*alumnos.forEach(a => {
			Axios.post('http://localhost:3001/nuevoAlumno',{
				alumno: a
			});
		});*/
		
		for(var i = 0; i*200 < alumnos.length; i++){
			await Axios.post('http://localhost:3001/nuevoAlumno',{
				alumnos: alumnos.slice(i*200,i*200 + 200)
			});
		}
	}

	const Papa = require("papaparse");
	const [data, setData] = useState({});

  return (
    <>
      <h1>Sección de los alumnos</h1>
      <div className="alumnos">
				<input type="file" accept=".csv" onChange={(e) => {
						Papa.parse(e.target.files[0], 
							{complete: (res, file) => {
									setData(res)
								}
							}
						)
					}
				} />
				<button onClick={() => {insertarAlumnos(data.data)}}>Guardar informacion</button>
        <TablaAlumnos />
      </div>
    </>
  )
}