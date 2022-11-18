import React from 'react'
import { logErrores, insertarAlumnos } from "../services/alumnoServices";

function BotonesAlumnos({data, setData}) {
	const Papa = require("papaparse");

	return (
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
			<button onClick={() => {console.log(logErrores)}}>Mostrar log</button>
    </div>
	)
}

export default BotonesAlumnos