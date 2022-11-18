import React from "react";
import Axios from "axios";
import papelera from "../assets/images/papelera.png";

const insertarSedes = (sedes) => {
  console.log(sedes);
  Axios.post("http://localhost:3001/nuevasSedes", {
    sedes: sedes.slice(1, sedes.length),
  });
};

const borrarSede = (sede) => {
  console.log("Borrando " + sede);
};

function BotonesSedes({ sedeSeleccionada }) {
  return (
    <>
      <div className="containerBotonesSedes">
        <input
          className="button"
          type="file"
          accept=".txt"
          onChange={(e) => {
            e.target.files[0].text().then((t) => {
              insertarSedes(t.split("\n"));
            });
          }}
        />
        <button
          className="button"
          key={"borrar"}
          onClick={() => {
            borrarSede(sedeSeleccionada);
          }}
        >
          <img src={papelera} className="icono" alt="Basura" />
          Eliminar sede
        </button>
        <button className="button">Modificar sede</button>
        <button className="button">Importar responsables</button>
        <button className="button">Responsables</button>
        <button className="button">Asignar institutos</button>
        <button className="button">Aulas</button>
      </div>
    </>
  );
}

export default BotonesSedes;
