import React from "react";
import "../../assets/css/Aulas.css"
import papelera from "../../assets/images/papelera.png";
import aulasServices from "../../services/aulasServices";
import swal from 'sweetalert';
import { useState } from "react";

export default function BotonesAulas({ data, setData, aulaSeleccionada, idSede }) {

    //let id, capacidad, disponibilidad;
		const [id,setId] = useState("")
		const [capacidad, setCapacidad] = useState(0)
		const [disponibilidad, setDisponibilidad] = useState("")
    let sede = idSede;

    const formCrearAula = document.getElementById("formularioCrearAula");
		const formModifAula = document.getElementById("formularioModificarAula");

    return (
        <>
            <div className="containerBotonesAulas">

                <button className="buttonAulas" onClick={()=>{
									formCrearAula.showModal();
								}}>Crear Aula</button>


                <button className="buttonAulas" onClick={() => {
                        if(aulaSeleccionada !== null){
													setId(aulaSeleccionada.Id);
													setCapacidad(aulaSeleccionada.Capacidad);
													setDisponibilidad(aulaSeleccionada.Disponibilidad);
													formModifAula.showModal();
												}else{
													swal({
														icon: "error",
														text: "Ningún aula ha sido seleccionada"
													});
												}
                    }}>
                    Modificar aula
                </button>

                <button className="buttonAulas"
                    onClick={() => {
                        aulasServices.borrarAula(aulaSeleccionada, data, setData);
                    }}>
                    <img src={papelera} className="icono" alt="" />
                    Borrar aula
                </button>
                
                <dialog id = "formularioCrearAula" className="customDialog">
                    <form className="form2" onSubmit={() => {
                            aulasServices.insertarAula(data, setData, id, capacidad, disponibilidad, sede);
														formCrearAula.close();
													}
                        }>
                        <h2>Crear Aula</h2>
                        <label><input placeholder="ID" type="text" onChange={(event) => setId(event.target.value)} /></label>
                        <br />
                        <br />
                        <label><input placeholder="Capacidad" type="number" onChange={(event) => setCapacidad(event.target.value)} /></label>
                        <br />
                        <br />
                        <label><input placeholder="Disponibilidad" type="text" onChange={(event) => setDisponibilidad(event.target.value)} /></label>
                        <br />
                        <button className="buttonForm2" type="submit">Aceptar</button>
                        <br />
                        <br />
                        <br />
                        <button className="buttonForm2" onClick={()=>{formCrearAula.close()}}>Cerrar</button>
                    </form>
                </dialog>

								<dialog id = "formularioModificarAula" className="customDialog">
                    <form className="form2" onSubmit={() => {
														aulasServices.modificarAula(id, capacidad, disponibilidad, aulaSeleccionada, data, setData);
														formModifAula.close();
													}
                        }>
                        <h2>Modificar Aula</h2>
                        <label><input placeholder="ID" type="text" value={id} onChange={(event) => setId(event.target.value)} /></label>
                        <br />
                        <br />
                        <label><input placeholder="Capacidad" type="number" value={capacidad} onChange={(event) => setCapacidad(event.target.value)} /></label>
                        <br />
                        <br />
                        <label><input placeholder="Disponibilidad" type="text" value={disponibilidad} onChange={(event) => setDisponibilidad(event.target.value)} /></label>
                        <br />
                        <button className="buttonForm2" type="submit" id="submit">Aceptar</button>
                        <br />
                        <br />
                        <br />
                        <button className="buttonForm2" onClick={()=>{formModifAula.close()}}>Cerrar</button>
                    </form>
                </dialog>

            </div>
        </>
    )
}