import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import pizarra from "../../assets/images/pizarra.png";
import swal from "sweetalert";
import sedesServices from "../../services/sedesServices";
import axios from "axios";

export default function GestionSede() {
  let params = useParams();
  let idSede = params.idSede.replace("$", "/");
  let disponibilidades = ["Primera franja de Primer día", "Primera franja de Segundo día", "Primera franja de Tercer día", "Segunda franja de Primer día", "Segunda franja de Segundo día", "Segunda franja de Tercer día", "Tercera franja de Primer día", "Tercera franja de Segundo día", "Tercera franja de Tercer día", "Primera franja de Primer día"]

  const [data, setData] = useState([]);

  function readFile(file) {
    const reader = new FileReader();
    const nombres = [];
    reader.onload = (event) => {
      event.target.result.split("\n").forEach((nombre) => {
        nombres.push(nombre);
      });
      setData(nombres);

      axios.post("http://localhost:3001/nuevoPersonal", {
        personal: nombres,
        sede: idSede,
        disponibilidad: disponibilidades
      });
    };
    reader.readAsText(file);

  }

  useEffect(() => {
    axios.post("http://localhost:3001/personalAulas",{sede:idSede}).then((personal) => {
      let real = [];
      personal.data.map((p) => {
        real.push(p.Responsable);
      })
      setData(real);
    });
  }, []);



  return (
    <>
      <div className="containerHeaderGestionSedes">
        <h2>Sede '{idSede}'</h2>
      </div>
      <div className="containerTablaAulas">
        <table className="tablaAulas">
          <thead>
            <tr>
              <th>Persona</th>
            </tr>
          </thead>
          <tbody>
            {data.map((persona, key) => (
              <tr key={key}>
                <td>{persona}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
            sedesServices.abrirPersonalSede(idSede);
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
        <button
          className="buttonSedes"
          onClick={() => {
            sedesServices.abrirInstitutosSede(idSede);
          }}
          >Asignar institutos
        </button>
      </div>
    </>
  );
  //<img src={pizarra} className="icono" alt="" />
}
