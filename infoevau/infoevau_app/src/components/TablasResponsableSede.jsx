import React from "react";

export default function TablaResponsablesSede({data, responsableSedeSeleccionado, setResponsableSedeSeleccionado }) {

  const showTable = () => {
    if (data === responsableSedeSeleccionado) {
      return (
        <tr style={{ backgroundColor: "#80ff80" }}>
          <td
            onClick={() => {
              setResponsableSedeSeleccionado(null);
            }}
          >
            {data}
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td
          onClick={() => {
            setResponsableSedeSeleccionado(data);
          }}
        >
          {data}
        </td>
      </tr>
    );
  }

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
            {showTable()}
          </tbody>
        </table>
      </div>
    </>
  );
}
