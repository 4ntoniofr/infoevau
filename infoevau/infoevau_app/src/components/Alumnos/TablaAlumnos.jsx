import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function TablaAlumnos({ data, setData, matriculas, setMatriculas, loading, setLoading }) {

  useEffect(() => {
    axios.get("http://localhost:3001/alumnos").then((alumnos) => {
      setData(alumnos.data);
      axios.get("http://localhost:3001/matriculas").then((matriculas) => {
        setMatriculas(matriculas.data);
        setLoading(false);
      });
    });
  }, []);

  const getMatriculas = (nif) => {
    let res = "";
    matriculas
      .filter((matricula) => matricula.NIF === nif)
      .forEach((matricula, i, array) => {
        res += matricula.Materia + (array.length - 1 !== i ? ", " : "");
      });
    return res;
  };

  return (
    <div className="containerTabla">
      {loading ? (
        <p className="loadingText">Cargando alumnos...</p>
      ) : (
        <table className="tablaAlumnos">
          <thead>
            <tr>
              <th className="medium">Instituto</th>
              <th className="small">Nombre</th>
              <th className="small">Apellido1</th>
              <th className="small">Apellido2</th>
              <th className="small">DNI/NIF</th>
              <th>Matriculas</th>
            </tr>
          </thead>
          <tbody>
            {data.map((alumno, key) => (
              <tr key={key}>
                <td className="medium">{alumno.Instituto}</td>
                <td className="small">{alumno.Nombre}</td>
                <td className="small">{alumno.Apellido1}</td>
                <td className="small">{alumno.Apellido2}</td>
                <td className="small">{alumno.NIF}</td>
                <td>{getMatriculas(alumno.NIF)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TablaAlumnos;
