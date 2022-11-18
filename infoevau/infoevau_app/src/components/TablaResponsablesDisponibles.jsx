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
              if (responsable.Nombre === responsableSeleccionado) {
                console.log("Seleccionado " + responsable.Nombre);
                return (
                  <tr key={key} style={{ backgroundColor: "#80ff80" }}>
                    <td
                      onClick={() => {
                        setResponsableSeleccionado(null);
                      }}
                    >
                      {responsable.Nombre}
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={key}>
                  <td
                    onClick={() => {
                      setResponsableSeleccionado(responsableSeleccionado.Nombre);
                    }}
                  >
                    {responsable.Nombre}
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
