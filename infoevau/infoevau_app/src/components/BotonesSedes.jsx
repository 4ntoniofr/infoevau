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
              setData(sedesServices.insertarSedes(t.split("\n")));
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
        <button 
					className="button"
					onClick={() => {
						setData(sedesServices.modificarSede(sedeSeleccionada, data));
					}}	
				>
					Modificar sede
				</button>
        <button className="button">Importar responsables</button>
        <button className="button">Responsables</button>
        <button
          className="button"
          onClick={() => {
            var cadena = sedeSeleccionada.replace(/ /g, "");
            var url = "/sedes/" + cadena + "/institutos";
            window.open(url);
          }}
        >
          Asignar institutos
        </button>
        <button className="button">Aulas</button>
      </div>
    </>
  );
}

export default BotonesSedes;
