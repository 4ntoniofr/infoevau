import React from "react";

export default function TablaResponsablesDisponibles({data, responsableSeleccionado, setResponsableSeleccionado }) {
  return (
    <>
      <div className="containerTablaResponsablesDisponibles">
        <table className="tablaResponsablesDisponibles">
          <thead>
            <tr>
              <th>Responsables Disponibles</th>
            </tr>
          </thead>
          <tbody>
            {data.map((responsable, key) => {
              if (responsable === responsableSeleccionado) {
                console.log("Seleccionado " + responsable);
                return (
                  <tr key={key} style={{ backgroundColor: "#80ff80" }}>
                    <td
                      onClick={() => {
                        setResponsableSeleccionado(null);
                      }}
                    >
                      {responsable}
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={key}>
                  <td
                    onClick={() => {
                      setResponsableSeleccionado(responsable);
                    }}
                  >
                    {responsable}
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
