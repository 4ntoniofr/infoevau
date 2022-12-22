import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import sedesServices from "../../services/sedesServices";
import axios from "axios";

export default function GestionSede() {
  let params = useParams();
  let idSede = params.idSede.replace("$", "/");
  let disponibilidades = ["Primera franja de Primer día", "Primera franja de Segundo día", "Primera franja de Tercer día", "Segunda franja de Primer día", "Segunda franja de Segundo día", "Segunda franja de Tercer día", "Tercera franja de Primer día", "Tercera franja de Segundo día", "Tercera franja de Tercer día"]

  const [data, setData] = useState([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const [asignaciones, setAsignaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const formVerAsignaciones = document.getElementById("dialogVerAsignacionPersonal");

  const handleSubmit = event => {
    event.preventDefault();
    //setData(sedesServices.modificarSede(sedeSeleccionada, nomSede, data));
    //setSedeSeleccionada(null);
    formVerAsignaciones.close();
  }

  const getAsignaciones = (responsable) => {
    axios.post("http://localhost:3001/asignacionesPersonal", {
      responsable: responsable
    }).then((asig) => {
      setAsignaciones(asig.data);
    });
  }

  function readFile(file) {
    const reader = new FileReader();
    const nombres = [];
    reader.onload = (event) => {
      event.target.result.split("\r\n").forEach((nombre) => {
        nombres.push(nombre);
      });
      
      axios.post("http://localhost:3001/nuevoPersonal", {
        personal: nombres,
        sede: idSede,
        disponibilidad: disponibilidades
      });

      //setData(nombres);
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
      setLoading(false);
    });
  }, []);



  return (
    <>
      <div className="containerHeaderGestionSedes">
        <h2>Sede '{idSede}'</h2>
      </div>
      <div className="containerTablaPersonalSede">
        { loading?
            <p className="loadingText">Cargando personal de la sede {idSede}...</p>
            :
            <></>
        }
        <table className="tablaPersonal">
          <thead>
            <tr>
              <th>Persona</th>
            </tr>
          </thead>
          <tbody>
            {
            [...new Set(data)].map((persona, key) => {
              if (persona === personaSeleccionada) {
                return (
                  <tr key={key} style={{ backgroundColor: "#80ff80" }}>
                    <td onClick={() => {setPersonaSeleccionada(null)}}>{persona}</td>
                  </tr>
                )
              }
              return (
                <tr key={key}>
                  <td onClick={() => {setPersonaSeleccionada(persona)}}>{persona}</td>
                </tr>
              )
            })}
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
                swal({
                  icon: "success",
                  title: "Fichero procesado",
                  text: "Se ha insertado el personal a la sede " + idSede,
                });
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
        {personaSeleccionada?
            <button className="buttonSedes" onClick={() => {getAsignaciones(personaSeleccionada); formVerAsignaciones.showModal();}}>Ver asignaciones</button>
            :
            <button className="pseudoDisabledButton">Ver asignaciones</button>
        }
      </div>

      <dialog id="dialogVerAsignacionPersonal" className="customDialogAsignaciones">
          <form className="formAsignaciones" onSubmit={handleSubmit}>

            <h3>Asignaciones de {personaSeleccionada}</h3>
            <table className="tablaSedes">
              <thead>
                <tr>
                  <th>Franja horaria</th>
                  <th>Aula</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {asignaciones.map((a,key) => (
                  <tr key={key}>
                    <td>{a.Momento}</td>
                    <td>{a.Aula}</td>
                    <td>{a.Rol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="buttonFormSedes" onClick={(event)=>{setPersonaSeleccionada(null)}}>Cerrar</button>
          </form>
        </dialog>
    </>
  );
  //<img src={pizarra} className="icono" alt="" />
}
