import React from "react";
import sedesServices from "../services/sedesServices";
import papelera from "../assets/images/papelera.png";
import pizarra from "../assets/images/pizarra.png";


function BotonesSedes({ data, setData, sedeSeleccionada }) {
  return (
    <>
      <div className="containerBotonesSedes">
        <input
          className="button"
          type="file"
          accept=".txt"
          onChange={(e) => {
            e.target.files[0].text().then((t) => {
              console.log(t.split("[\r\n]"));
              setData(sedesServices.insertarSedes(t.split("\r\n")));
            });
          }}
        />
        <button
          className="button"
          key={"borrar"}
          onClick={() => {
            setData(sedesServices.borrarSede(sedeSeleccionada, data));
          }}
        >
          <img src={papelera} className="icono" alt="" />
          Eliminar sede
        </button>
        <button 
					className="button"
					onClick={() => {
						setData(sedesServices.modificarSede(sedeSeleccionada, data));
					}}	
				>
					Modificar sede
				</button>
        <button className="button">Importar responsables</button>
        <button 
        className="button"
        onClick={() => {
          sedesServices.abrirResponsablesSede(sedeSeleccionada);
        }}
        >Responsables</button>
        <button
          className="button"
          onClick={() => {
            sedesServices.abrirInstitutosSede(sedeSeleccionada);
          }}
          >Asignar institutos
        </button>
        <button 
          className="button"
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