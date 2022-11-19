import React from "react";
import axios from "axios";
import swal from 'sweetalert';

function BotonesResponsables({ data, setData, dataResponsablesSede, setDataResponsablesSede , responsableSeleccionado, responsableSedeSeleccionado, setResponsableSedeSeleccionado, setResponsableSeleccionado , sede }) {

    const insertarResponsables = (responsables) => {
        axios.post("http://localhost:3001/nuevosResponsables", {
          responsables: responsables.slice(1, responsables.length),
        });
        return responsables.slice(1, responsables.length).map((responsable) => {
          return { Nombre: responsable };
        });
      };

    const asignarResponsable = (responsable, sedeselected, responsablesMemoria, responsableSede) => {
      if(responsable){
        if(responsableSede){
          swal({
            icon: "error",
            title: "Error",
            text: "Solo se puede tener un representante por sede, si quiere cambiar de representante, desasigne el actual primero." 
          });
          return responsablesMemoria;
        }else{
          axios.post("http://localhost:3001/asignarResponsable", {
            responsable: responsable,
            sede: sedeselected
          });
          setDataResponsablesSede(responsable)
          return responsablesMemoria.filter((responsableMemoria) => responsableMemoria !== responsable);
        }
      }else{
        swal({
          icon: "error",
          title: "Error",
          text: "No se ha seleccionado el responsable." 
        });
        return responsablesMemoria;
      }
    }

    const desasignarResponsable = (sedeselected, responsableMemoria) => {
      console.log(responsableSedeSeleccionado)
      if(responsableSedeSeleccionado){
        axios.post("http://localhost:3001/desasignarResponsable", {
          sede: sedeselected
        });
        setDataResponsablesSede(null)
        setResponsableSedeSeleccionado(null)
        setResponsableSeleccionado(null)
        responsableMemoria.push(responsableSedeSeleccionado)
        responsableMemoria.sort()
        return(responsableMemoria)
      }else{
        swal({
          icon: "error",
          title: "Error",
          text: "No se ha seleccionado el responsable." 
        });
        return responsableMemoria;
      }
    }

  return (
    <>
      <div className="containerBotonesResponsables">
        <button
          className="button"
          key={"asignar"}
          onClick={() => {
            setData(asignarResponsable(responsableSeleccionado, sede, data, dataResponsablesSede))
          }}
        >
          Asignar Responsable
        </button>

        <button
          className="button"
          key={"desasignar"}
          onClick={() => {
            setData(desasignarResponsable(sede, data));
          }}
        >
          Desasignar Responsable
        </button>

        <input
                className="button"
                type="file"
                accept=".txt"
                onChange={(e) => {
                    e.target.files[0].text().then((t) => {
                    setData(insertarResponsables(t.split("\n")));
                });
            }}
        />

      </div>
    </>
  );
}

export default BotonesResponsables;