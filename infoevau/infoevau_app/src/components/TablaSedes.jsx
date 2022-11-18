import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function seleccionarSede(sede) {
  console.log("Nombre: " + sede);
}

function TablaSedes({ setSedeSeleccionada }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/sedes").then((sedes) => {
      setData(sedes.data);
    });
  });

  return (
    <>
      <div className="containerTablaSedes">
        <table className="tablaSedes">
          <thead>
            <tr>
              <th>Sedes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((sede, key) => (
              <tr key={key}>
                <td
                  onClick={() => {
                    setSedeSeleccionada(sede.Nombre);
                  }}
                >
                  {sede.Nombre}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TablaSedes;
