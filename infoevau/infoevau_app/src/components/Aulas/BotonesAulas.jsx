import React from "react";
import "../../assets/css/Aulas.css"
import papelera from "../../assets/images/papelera.png";
import aulasServices from "../../services/aulasServices";

export default function BotonesAulas({ data, setData, aulaSeleccionada, idSede }) {

    let id, capacidad, disponibilidad;
    let sede = idSede;


    return (
        <>
            <div className="containerBotonesAulas">

                <div className="containerFormulario">

                    <form onSubmit={() => { aulasServices.insertarAula(data, id, capacidad, disponibilidad, sede) }}>

                        <label>
                            ID
                            <input placeholder="ID" type="text" onChange={(event) => id = event.target.value} />
                        </label>

                        <label>
                            Capacidad
                            <input placeholder="Capacidad" type="number" onChange={(event) => capacidad = event.target.value} />
                        </label>

                        <label>
                            Disponibilidad
                            <input placeholder="Disponibilidad" type="text" onChange={(event) => disponibilidad = event.target.value} />
                        </label>

                        <button className="buttonAulas" type="submit"> Crear aula </button>
                    </form>
                </div>


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