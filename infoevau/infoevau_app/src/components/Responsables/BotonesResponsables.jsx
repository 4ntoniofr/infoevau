import React from "react";
import responsablesServices from "../../services/responsablesServices";

function BotonesResponsables({ data, setData, dataResponsablesSede, setDataResponsablesSede , responsableSeleccionado, responsableSedeSeleccionado, setResponsableSedeSeleccionado, setResponsableSeleccionado, dataResponsablesAsignados, setDataResponsablesAsignados , sede }) {

  return (
    <>
      <div className="containerBotonesResponsables">
        <button
          className="button"
          key={"asignar"}
          onClick={() => {
            setData(responsablesServices.asignarResponsable(responsableSeleccionado, sede, data, dataResponsablesSede, setDataResponsablesSede, dataResponsablesAsignados, setDataResponsablesAsignados, sede))
          }}
        >
          Asignar Responsable
        </button>

        <button
          className="button"
          key={"desasignar"}
          onClick={() => {
            setData(responsablesServices.desasignarResponsable(sede, data, dataResponsablesSede, setDataResponsablesSede, dataResponsablesAsignados, setDataResponsablesAsignados));
          }}
        >
          Desasignar Responsable
        </button>

      </div>
    </>
  );
}

export default BotonesResponsables;