import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function TablaAlumnos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/alumnos").then((alumnos) => {
      setData(alumnos.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="containerTabla">
      {loading ? (
        <p className="loadingText">
          Cargando alumnos...
        </p>
      ) : (
        <table className="tablaAlumnos">
          <thead>
            <tr>
              <th>Instituto</th>
              <th>Nombre</th>
              <th>Apellido1</th>
              <th>Apellido2</th>
              <th>DNI/NIF</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TablaAlumnos;
