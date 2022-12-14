import React from "react";
import sedesServices from "../../services/sedesServices";
import responsablesServices from "../../services/responsablesServices";
import papelera from "../../assets/images/papelera.png";
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
                    //text: "Se han insertado " + sedesInsertadas + " nuevas sedes."
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
        {sedeSeleccionada === null ?
        <button className="pseudoDisabledButton"
        onClick={() => {
          swal({
            icon: "info",
            title: "No hay ninguna sede seleccionada",
            text: "Seleccione una sede para poder eliminarla"
          })
        }}>Eliminar sede 
        </button>
        :
        <button
          className="buttonSedesBorrar"
          key={"borrar"}
          onClick={() => {
            setData(sedesServices.borrarSede(sedeSeleccionada, data));
            setSedeSeleccionada(null);
          }}
        >
          <img src={papelera} className="icono" alt="" />
          Eliminar sede
        </button>}
        { sedeSeleccionada === null ?
        <button className="pseudoDisabledButton"
        onClick={() => {
          swal({
            icon: "info",
            title: "No hay ninguna sede seleccionada",
            text: "Seleccione una sede para poder modificarla"
          })
        }}>Modificar sede 
        </button>
        :
        <button 
					className="buttonSedes"
					onClick={() => {
						setData(sedesServices.modificarSede(sedeSeleccionada, data));
            setSedeSeleccionada(null);
					}}	
				>
					Modificar sede
				</button>}
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
        { sedeSeleccionada === null ?
        <button className="pseudoDisabledButton"
        onClick={() => {
          swal({
            icon: "info",
            title: "No hay ninguna sede seleccionada",
            text: "Seleccione una sede para poder gestionarla"
          })
        }}>Gestionar sede 
        </button>
        :
        <button 
          className="buttonSedes"
          onClick={ () => {
            sedesServices.abrirSede(sedeSeleccionada);
          }}>
          Gestionar sede
        </button>}
      </div>
    </>
  );
}

export default BotonesSedes;