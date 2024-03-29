import React from "react";

export default function TablaSedes({data, sedeSeleccionada, setSedeSeleccionada }) {
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
      {data === null || data.length === 0?
        <div className="containerNoSedes">
            <br />
            <h3>No hay sedes.</h3>
            <p>Pulse en "Importar sedes" para cargar sedes</p>
          </div>
          :
          <></>
      }
    </>
  );
}
