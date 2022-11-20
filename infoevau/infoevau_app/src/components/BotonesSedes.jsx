import React from "react";
import sedesServices from "../services/sedesServices";
import responsablesServices from "../services/responsablesServices";
import papelera from "../assets/images/papelera.png";
import pizarra from "../assets/images/pizarra.png";
import swal from 'sweetalert';

function BotonesSedes({ data, setData, sedeSeleccionada }) {
  return (
    <>
      <div className="containerBotonesSedes">
        <input
          className="buttonSedes"
          type="file"
          accept=".txt"
          onChange={(e) => {
            e.target.files[0].text().then((t) => {
              let sedes = t.split("\r\n");
              setData(sedesServices.insertarSedes(sedes));
              let numSedes = sedes.length - 1;
              swal({
                icon: "success",
                title: "Fichero " + e.target.files[0].name + " procesado",
                text: numSedes + " sedes insertadas correctamente"
              });
            });
          }}
        />
        <button
          className="buttonSedes"
          key={"borrar"}
          onClick={() => {
            setData(sedesServices.borrarSede(sedeSeleccionada, data));
          }}
        >
          <img src={papelera} className="icono" alt="" />
          Eliminar sede
        </button>
        <button 
					className="buttonSedes"
					onClick={() => {
						setData(sedesServices.modificarSede(sedeSeleccionada, data));
					}}	
				>
					Modificar sede
				</button>
        <input
                className="button"
                type="file"
                accept=".txt"
                onChange={(e) => {
                    e.target.files[0].text().then((t) => {
                    	//setData(responsablesServices.insertarResponsables(t.split("\n")));
											let n = responsablesServices.insertarResponsables(t.split("\n"));
											swal({
												icon: "success",
												text: "Se han insertado correctamente " + n + " responsables"
											})
                });
            }}
        />
        <button 
        className="buttonSedes"
        onClick={() => {
          sedesServices.abrirResponsablesSede(sedeSeleccionada);
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