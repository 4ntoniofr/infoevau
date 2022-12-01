import React from "react";
import sedesServices from "../../services/sedesServices";
import responsablesServices from "../../services/responsablesServices";
import papelera from "../../assets/images/papelera.png";
import pizarra from "../../assets/images/pizarra.png";
import swal from 'sweetalert';

function BotonesSedes({ data, setData, sedeSeleccionada, setSedeSeleccionada }) {
  return (
    <>
      <div className="containerBotonesSedes">
        <div className="custom-input-file">
          <input
            className="input-file"
            type="file"
            accept=".txt"
            name="Importar sedes"
            onChange={(e) => {
              e.target.files[0].text().then((t) => {
                let sedes = t.split("\r\n");
                if (sedes[0] === "SEDE") {
                  sedesServices.insertarSedes(sedes, data, setData);
                  swal({
                    icon: "success",
                    title: "Fichero " + e.target.files[0].name + " procesado.",
                    text: "Sedes importadas con éxito."
                  })
                } else {
                  swal({
                    icon: "error",
                    title: "No se puede procesar el fichero " +  e.target.files[0].name,
                    text: "Debe ser un fichero de texto y la primera línea debe ser 'SEDE'"
                  })
                } 
              });
            }}
          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Importar sedes
        </div>
        <button
          className="buttonSedes"
          key={"borrar"}
          onClick={() => {
            setData(sedesServices.borrarSede(sedeSeleccionada, data));
            setSedeSeleccionada(null);
          }}
        >
          <img src={papelera} className="icono" alt="" />
          Eliminar sede
        </button>
        <button 
					className="buttonSedes"
					onClick={() => {
						setData(sedesServices.modificarSede(sedeSeleccionada, data));
            setSedeSeleccionada(null);
					}}	
				>
					Modificar sede
				</button>
        <div className="custom-input-file">
          <input
                  className="input-file"
                  type="file"
                  accept=".txt"
                  onChange={(e) => {
                      e.target.files[0].text().then((t) => {
                        let n = responsablesServices.insertarResponsables(t.split("\n"));
                        swal({
                          icon: "success",
                          text: "Se han insertado correctamente " + n + " responsables"
                        })
                  });
              }}
          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;Importar responsables
        </div>
        <button 
        className="buttonSedes"
        onClick={() => {
          window.location.href = "/sedes/responsablesSede";
        }}
        >Responsables</button>
        <button
          className="buttonSedes"
          onClick={() => {
            sedesServices.abrirInstitutosSede(sedeSeleccionada);
          }}
          >Asignar institutos
        </button>
        <button 
          className="buttonSedes"
          onClick={ () => {
            sedesServices.abrirAulasSede(sedeSeleccionada);
          }}>
          <img src={pizarra} className="icono" alt="" />
          Aulas
        </button>
      </div>
    </>
  );
}

export default BotonesSedes;