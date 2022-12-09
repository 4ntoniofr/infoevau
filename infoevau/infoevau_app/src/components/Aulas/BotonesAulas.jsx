import React from "react";
import "../../assets/css/Aulas.css"
import papelera from "../../assets/images/papelera.png";
import aulasServices from "../../services/aulasServices";

export default function BotonesAulas({ data, setData, aulaSeleccionada, idSede }) {

    let id, capacidad, disponibilidad;
    let sede = idSede;

    const formCrearAula = document.getElementById("formularioCrearAula");
    return (
        <>
            <div className="containerBotonesAulas">

                <button className="buttonAulas" onClick={()=>{formCrearAula.showModal()}}>Crear Aula</button>


                <button className="buttonAulas" onClick={() => {
                        setData(aulasServices.modificarAula(aulaSeleccionada, data));
                    }}>
                    Modificar aula
                </button>

                <button className="buttonAulas"
                    onClick={() => {
                        setData(aulasServices.borrarAula(aulaSeleccionada, data));
                    }}>
                    <img src={papelera} className="icono" alt="" />
                    Borrar aula
                </button>
                
                <dialog id = "formularioCrearAula" className="customDialog">
                    <form class="form2" onSubmit={() => {
                            aulasServices.insertarAula(data, id, capacidad, disponibilidad, sede)}
                        }>
                        <h2>Crear Aula</h2>
                        <label><input placeholder="ID" type="text" onChange={(event) => id = event.target.value} /></label>
                        <br />
                        <br />
                        <label><input placeholder="Capacidad" type="number" onChange={(event) => capacidad = event.target.value} /></label>
                        <br />
                        <br />
                        <label><input placeholder="Disponibilidad" type="text" onChange={(event) => disponibilidad = event.target.value} /></label>
                        <br />
                        <button className="buttonForm2" type="submit">Aceptar</button>
                        <br />
                        <br />
                        <br />
                        <button className="buttonForm2" onClick={()=>{formCrearAula.close()}}>Cerrar</button>
                    </form>
                </dialog>

            </div>
        </>
    )
}