import React from "react";

export default function TablaResponsablesSede({data, sedeSeleccionada, setSedeSeleccionada }) {

  return (
    <>
      <div className="containerTablaResponsablesSede">
      <table className="tablaResponsablesSede">
        <thead>
          <tr>
            <th>Sede</th>
            <th>Responsable</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sede, key) =>  {
            if (sede === sedeSeleccionada) {
              console.log('Sede seleccionada: ' + sedeSeleccionada.Nombre);
              return (
                <tr key={key} style={{ backgroundColor: "#80ff80" }}>
                <td
                  onClick={() => {
                    setSedeSeleccionada(null);
                  }}
                >
                  {sede.Nombre}
                </td>
                <td
                  onClick={() => {
                    setSedeSeleccionada(null);
                  }}
                >
                  {sede.Responsable === null ?
                    "Sin responsable"
                    :
                    sede.Responsable
                  }
                </td>
              </tr>                
              );
            }

            return (
              <tr key={key}>
                <td
                  onClick={() => {
                    setSedeSeleccionada(sede);
                  }}
                >
                  {sede.Nombre}
                </td>
                <td
                  onClick={() => {
                    setSedeSeleccionada(sede);
                  }}
                >
                  {sede.Responsable === null ?
                    "Sin responsable"
                    :
                    sede.Responsable
                  }
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
