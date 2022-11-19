import React from "react";

export default function TablaResponsablesSede({data, responsableSedeSeleccionado, setResponsableSedeSeleccionado }) {
  return (
    <>
      <div className="containerTablaResponsablesSede">
        <table className="tablaResponsablesSede">
          <thead>
            <tr>
              <th>Responsables En Sede</th>
            </tr>
          </thead>
          <tbody>
            {data.map((responsable, key) => {
              if (responsable.Responsable === responsableSedeSeleccionado) {
                console.log("Seleccionado " + responsable);
                return (
                  <tr key={key} style={{ backgroundColor: "#80ff80" }}>
                    <td
                      onClick={() => {
                        setResponsableSedeSeleccionado(null);
                      }}
                    >
                      {responsable.Responsable}
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={key}>
                  <td
                    onClick={() => {
                      setResponsableSedeSeleccionado(responsable.Responsable);
                    }}
                  >
                    {responsable.Responsable}
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
