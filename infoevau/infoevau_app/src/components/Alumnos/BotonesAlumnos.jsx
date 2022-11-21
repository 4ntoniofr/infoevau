import React from 'react'
import swal from "sweetalert";
import alumnoServices from "../../services/alumnoServices";

function BotonesAlumnos({data, setData}) {
	const Papa = require("papaparse");

	return (
		<div className="containerButtons">
      <input
         className='buttonAlumnos'
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
      <br />
      <button className='buttonAlumnos'
      	onClick={() => {
					alumnoServices.insertarAlumnos(data.data.slice(1, data.data.length)).then((r) => {
						swal({
							icon: "success",
							title: "Inserción exitosa",
							text: "Se han insertado correctamente " + r + " de " + (data.data.length-1) + " alumnos posibles"
						})
					})
        }}
      >
      	Guardar informacion
      </button>
      <br />
			<button className='buttonAlumnos' onClick={() => {alumnoServices.generarFichero()}}>Mostrar log</button>
			<button className='buttonAlumnos' onClick={() => {alumnoServices.generarFichero()}}></button>
			<input
                className="buttonAlumnos"
                type="file"
                accept=".txt"
                onChange={(e) => {
                    e.target.files[0].text().then((t) => {
											alumnoServices.insertarMaterias(t.split("\n"));
											swal({
												icon: "success",
												text: "Se han insertado correctamente " + t.split("\n").length + " materias"
											})
                });
            }}
        />
    </div>
	)
}

export default BotonesAlumnos