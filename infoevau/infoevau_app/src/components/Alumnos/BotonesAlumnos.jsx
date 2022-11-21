import React from 'react'
import swal from "sweetalert";
import alumnoServices from "../../services/alumnoServices";

function BotonesAlumnos({data, setData}) {
	const Papa = require("papaparse");

	return (
		<div className="containerButtons">
		<div className='custom-input-file'>
      <input
         className='input-file'
         type="file"
         accept=".csv"
         onChange={(e) => {
			if (e.target.files[0].name.endsWith(".csv")) {
				Papa.parse(e.target.files[0], {
					complete: (res, file) => {
						setData(res);
				   },
			   });
			} else {
				swal({
					icon: "error",
					title: "Formato inválido",
					text: "El formato del archivo '" + e.target.files[0].name + "' no es válido y no puede importarse."
				})
			}
          }}
      />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	  &nbsp;&nbsp;&nbsp;&nbsp;Importar alumnos
	  </div>
      <br />
      <button className='buttonAlumnos'
      	onClick={() => {
			if (data.data.length > 0) {
					alumnoServices.insertarAlumnos(data.data.slice(1, data.data.length)).then((r) => {
						swal({
							icon: "success",
							title: "Inserción exitosa",
							text: "Se han insertado correctamente " + r + " de " + (data.data.length-1) + " alumnos posibles"
						})
					})
			} else {
				swal({
					icon: "info",
					title: "No hay datos a importar",
					text: "Seleccione primero un archivo .csv para cargar los datos"
				})
			}
        }}
      >
      	Guardar informacion
      </button>
      <br />
			<button className='buttonAlumnos' onClick={() => {alumnoServices.generarFichero()}}>Mostrar log</button>
			<br />
			<div className='custom-input-file'>
			<input
                className="input-file"
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
        	/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;Importar materias
			</div>
    </div>
	)
}

export default BotonesAlumnos