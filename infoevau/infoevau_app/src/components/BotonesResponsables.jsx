import React from "react";
import axios from "axios";
import swal from 'sweetalert';

function BotonesResponsables({ data, setData, responsableSeleccionado, responsableSedeSeleccionado , sede }) {

    const insertarResponsables = (responsables) => {
        axios.post("http://localhost:3001/nuevosResponsables", {
          responsables: responsables.slice(1, responsables.length),
        });
        return responsables.slice(1, responsables.length).map((responsable) => {
          return { Nombre: responsable };
        });
      };

    const asignarResponsable = (responsable, sedeselected) => {
      if(responsable){
        axios.post("http://localhost:3001/asignarResponsable", {
          responsable: responsable,
          sede: sedeselected
        });
      }else{
        swal({
          icon: "error",
          title: "Error",
          text: "No se ha seleccionado el responsable." 
        });
      }
    }

    const desasignarResponsable = (sedeselected) => {
      if(responsableSedeSeleccionado){
        axios.post("http://localhost:3001/desasignarResponsable", {
          sede: sedeselected
        });
      }else{
        swal({
          icon: "error",
          title: "Error",
          text: "No se ha seleccionado el responsable." 
        });
      }
    }

  return (
    <>
      <div className="containerBotonesResponsables">
        <button
          className="button"
          key={"asignar"}
          onClick={() => {
            asignarResponsable(responsableSeleccionado, sede)
          }}
        >
          Asignar Responsable
        </button>

        <button
          className="button"
          key={"desasignar"}
          onClick={() => {
            desasignarResponsable(sede);
          }}
        >
          Desasignar Responsable
        </button>

        <input
                className="button"
                type="file"
                accept=".txt"
                onChange={(e) => {
                    e.target.files[0].text().then((t) => {
                    setData(insertarResponsables(t.split("\n")));
                });
            }}
        />

      </div>
    </>
  );
}

export default BotonesResponsables;