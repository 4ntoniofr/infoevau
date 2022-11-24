import React from "react";
import swal from "sweetalert";
import responsablesServices from "../../services/responsablesServices";

function BotonesResponsables({ dataRespDisp, setDataRespDisp, respDispSeleccionado, sedeSeleccionada, dataSedes, setDataSedes }) {

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
                  responsablesServices.asignarResponsable(respDispSeleccionado, sedeSeleccionada, dataSedes, setDataSedes, dataRespDisp);
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
              //setData(responsablesServices.desasignarResponsable(sede, data, dataResponsablesSede, setDataResponsablesSede, dataResponsablesAsignados, setDataResponsablesAsignados));
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