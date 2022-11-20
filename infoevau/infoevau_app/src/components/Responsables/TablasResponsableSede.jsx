import React from "react";

export default function TablaResponsablesSede({data, setData }) {

  return (
    <>
      <div className="containerTablaResponsablesSede">
      <table className="tablaAlumnos">
        <thead>
          <tr>
            <th>Sede</th>
            <th>Responsable</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tupla, key) => (
            <tr key={key}>
              <td>{tupla.Nombre}</td>
              <td>{tupla.Responsable}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}
