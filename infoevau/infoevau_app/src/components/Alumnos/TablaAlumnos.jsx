import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function TablaAlumnos({ data, setData }) {
  const [loading, setLoading] = useState(true);
  const [matriculas, setMatriculas] = useState([]);

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
              <th>Instituto</th>
              <th>Nombre</th>
              <th>Apellido1</th>
              <th>Apellido2</th>
              <th>DNI/NIF</th>
              <th>Matriculas</th>
            </tr>
          </thead>
          <tbody>
            {data.map((alumno, key) => (
              <tr key={key}>
                <td>{alumno.Instituto}</td>
                <td>{alumno.Nombre}</td>
                <td>{alumno.Apellido1}</td>
                <td>{alumno.Apellido2}</td>
                <td>{alumno.NIF}</td>
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
