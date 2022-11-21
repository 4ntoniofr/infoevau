import React from "react";
import responsablesServices from "../../services/responsablesServices";

function BotonesResponsables({ data, setData, dataResponsablesSede, setDataResponsablesSede , responsableSeleccionado, responsableSedeSeleccionado, setResponsableSedeSeleccionado, setResponsableSeleccionado , sede }) {

  return (
    <>
      <div className="containerBotonesResponsables">
        <button
          className="button"
          key={"asignar"}
          onClick={() => {
            setData(responsablesServices.asignarResponsable(responsableSeleccionado, sede, data, dataResponsablesSede, setDataResponsablesSede))
          }}
        >
          Asignar Responsable
        </button>

        <button
          className="button"
          key={"desasignar"}
          onClick={() => {
            setData(responsablesServices.desasignarResponsable(sede, data, dataResponsablesSede, setDataResponsablesSede, responsableSeleccionado, setResponsableSedeSeleccionado, setResponsableSeleccionado));
          }}
        >
          Desasignar Responsable
        </button>

      </div>
    </>
  );
}

export default BotonesResponsables;