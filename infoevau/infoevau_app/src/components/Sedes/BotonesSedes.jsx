import React from "react";
import sedesServices from "../../services/sedesServices";
import responsablesServices from "../../services/responsablesServices";
import swal from 'sweetalert';
import { useState } from "react";

function BotonesSedes({ data, setData, sedeSeleccionada, setSedeSeleccionada }) {
  const [nomSede,setNomSede] = useState("")
  const formModificarSede = document.getElementById("formularioModificarSede");

  const handleSubmit = event => {
    event.preventDefault();
    setData(sedesServices.modificarSede(sedeSeleccionada, nomSede, data));
    setSedeSeleccionada(null);
    formModificarSede.close();
  }

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
            setNomSede(null);
          }}
        >
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
            setNomSede(sedeSeleccionada);
            formModificarSede.showModal();
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

        <dialog id="formularioModificarSede" className="customDialog">
          <form className="formSedes" onSubmit={handleSubmit}>
            <h3>Introduzca el nuevo nombre de la sede</h3>
            <label><input style={{width: '400px'}} placeholder="nomSede" type="text" value={nomSede} onChange={(event) => setNomSede(event.target.value)} /></label>
            <br />
            <br />
            <button className="buttonFormSedes" type="submit">Aceptar</button>
            <br />
            <br />
            <br />
            <button className="buttonFormSedes" onClick={(event)=>{setNomSede("")}}>Cerrar</button>
          </form>
        </dialog>
      </div>
    </>
  );
}

export default BotonesSedes;