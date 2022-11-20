import React from "react";
import "../../assets/css/Aulas.css"
import papelera from "../../assets/images/papelera.png";
import aulasServices from "../../services/aulasServices";
import swal from 'sweetalert';

export default function BotonesAulas ({data, setData, aulaSeleccionada, idSede}) {

    let id,capacidad,disponibilidad;
    let sede = idSede;


    return (
        <>
        <div className="containerBotonesAulas">
            <form onSubmit={() => {
                try{
                    aulasServices.insertarAula(data,id,capacidad,disponibilidad,sede);
                }
                catch (error){
                    console.log("illoooooooo");
                    swal({
                        icon: "success",
                        text: "Ha ocurrido un error con la inserccion del aula"
                    })
                }
                }}>
                <label>
                    Id:
                    <input type="text" onChange={(event) => id = event.target.value}/>
                </label>

                <label>
                    Capacidad:
                    <input type="number" onChange={(event) => capacidad =  event.target.value}/>
                </label>
                
                <label>
                    Disponibilidad:
                    <input type="text" onChange={(event) => disponibilidad = event.target.value}/>
                </label>

                <button className="buttonAulas" type="submit"> Crear aula </button>
            </form>
            
            <button className="buttonAulas">
                Modificar aula
            </button>
            <button className="buttonAulas"
                onClick={() => {
                    setData(aulasServices.borrarAula(aulaSeleccionada, data));
                }}>
                <img src={papelera} className="icono" alt="" />
                Borrar aula
            </button>
        </div>
        </>
    )
}