import React from "react";
import sedesServices from "../services/sedesServices";
import papelera from "../assets/images/papelera.png";

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
              sedesServices.insertarSedes(t.split("\n"), setData);
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
