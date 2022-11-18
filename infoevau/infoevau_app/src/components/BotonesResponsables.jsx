import React from "react";
import axios from "axios";

function BotonesResponsables({ data, setData, responsableSeleccionado }) {

    const insertarResponsables = (responsables) => {
        axios.post("http://localhost:3001/nuevosResponsables", {
          responsables: responsables.slice(1, responsables.length),
        });
        return responsables.slice(1, responsables.length).map((responsable) => {
          return { Nombre: responsable };
        });
      };

  return (
    <>
      <div className="containerBotonesResponsables">
        <button
          className="button"
          key={"asignar"}
          onClick={() => {
            console.log("asignar responsable "+responsableSeleccionado);
          }}
        >
          Asignar Responsable
        </button>

        <button
          className="button"
          key={"desasignar"}
          onClick={() => {
            console.log("desasignar responsable "+responsableSeleccionado);
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