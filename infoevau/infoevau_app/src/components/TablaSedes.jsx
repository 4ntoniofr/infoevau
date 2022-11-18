import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TablaSedes({ sedeSeleccionada, setSedeSeleccionada }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/sedes").then((sedes) => {
      setData(sedes.data);
    });
  }, []);

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
            {data.map((sede, key) => {
              if (sede.Nombre === sedeSeleccionada) {
                console.log("Seleccionada " + sede.Nombre);
                return (
                  <tr key={key} style={{ backgroundColor: "#80ff80" }}>
                    <td
                      onClick={() => {
                        setSedeSeleccionada(null);
                      }}
                    >
                      {sede.Nombre}
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={key}>
                  <td
                    onClick={() => {
                      setSedeSeleccionada(sede.Nombre);
                    }}
                  >
                    {sede.Nombre}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}