import React from "react";
import swal from "sweetalert";
import responsablesServices from "../../services/responsablesServices";

function BotonesResponsables({ dataRespDisp, setResponsableSeleccionado, sedeSeleccionada, setSedeSeleccionada, setDataRespDisp, respDispSeleccionado, dataSedes, setDataSedes }) {

  return (
    <>
      <div className="containerBotonesResponsables">

        {(sedeSeleccionada === null || respDispSeleccionado === null) ?
            <button
              className="pseudoDisabledButton"
              key={"asignar"}
              onClick={() => {
                swal({
                  icon: "error",
                  title: "No se puede realizar la asignación",
                  text: "Para asignar un responsable a una sede debe seleccionar un responsable de entre los disponibles y una sede."
                })
              }}
              >
              Asignar Responsable
            </button>
            :
            <button
            className="button"
            key={"asignar"}
            onClick={() => {
                  responsablesServices.asignarResponsable(respDispSeleccionado, sedeSeleccionada, setDataRespDisp, setDataSedes);
                  setResponsableSeleccionado(null);
                  setSedeSeleccionada(null);
              }}
            >
            Asignar Responsable
          </button>
        }


        {(sedeSeleccionada === null || sedeSeleccionada.Responsable === null) ?
          <button
          className="pseudoDisabledButton"
          key={"desasignar"}
          onClick={() => {
            swal({
              icon: "error",
              title: "No se puede realizar la operación",
              text: "Para desasignar un responsable de una sede debe seleccionar una sede que tenga un responsable."
            })
          }}
          >
          Desasignar Responsable
          </button>          
        :
          <button
            className="button"
            key={"desasignar"}
            onClick={() => {
              responsablesServices.desasignarResponsable(sedeSeleccionada, setDataSedes, setDataRespDisp);
              setSedeSeleccionada(null);
            }}
          >
            Desasignar Responsable
          </button>
        }


      </div>
    </>
  );
}

export default BotonesResponsables;