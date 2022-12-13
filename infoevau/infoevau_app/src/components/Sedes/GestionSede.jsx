import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import pizarra from "../../assets/images/pizarra.png";
import swal from "sweetalert";
import sedesServices from "../../services/sedesServices";

export default function GestionSede() {
  let params = useParams();
  let idSede = params.idSede.replace("$", "/");

  const [data, setData] = useState([]);

  function readFile(file) {
    const reader = new FileReader();
    const nombres = [];
    reader.onload = (event) => {
      event.target.result.split("\n").forEach((nombre) => {
        nombres.push(nombre);
      });
      setData(nombres);
    };
    reader.readAsText(file);
  }

  return (
    <>
      <div className="containerHeaderGestionSedes">
        <h2>Sede '{idSede}'</h2>
      </div>
      <div>
        {data.map((nombre, key) => (
          <p key={key}>{nombre}</p>
        ))}
      </div>
      <div className="containerBotonesGestionSedes">
        <div className="custom-input-file">
          <input
            className="input-file"
            type="file"
            accept=".txt"
            name="Importar personal"
            onChange={(e) => {
              if (e.target.files[0].name.endsWith(".txt")) {
                readFile(e.target.files[0]);
              } else {
                swal({
                  icon: "error",
                  title: "Formato inválido",
                  text:
                    "El formato del archivo '" +
                    e.target.files[0].name +
                    "' no es válido y no puede importarse.",
                });
              }
            }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Importar personal
        </div>
        <button
          className="buttonSedes"
          onClick={() => {
            sedesServices.abrirAulasSede(idSede);
          }}
        >
          Asignar Personal
        </button>
        <button
          className="buttonSedes"
          onClick={() => {
            sedesServices.abrirAulasSede(idSede);
          }}
        >
          Gestionar Aulas
        </button>
      </div>
    </>
  );
  //<img src={pizarra} className="icono" alt="" />
}
