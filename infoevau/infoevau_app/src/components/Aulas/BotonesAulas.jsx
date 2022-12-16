import React from "react";
import "../../assets/css/Aulas.css"
import papelera from "../../assets/images/papelera.png";
import aulasServices from "../../services/aulasServices";
import swal from 'sweetalert';
import { useState } from "react";
import sedesServices from "../../services/sedesServices";

export default function BotonesAulas({ data, setData, aulaSeleccionada, idSede }) {

		const [id,setId] = useState("")
		const [capacidad, setCapacidad] = useState(0)
		const [disponibilidad, setDisponibilidad] = useState([])
		const [modificar, setModificar] = useState(false)
        const [codigo, setCodigo] = useState(0)
    let sede = idSede;

    const formCrearAula = document.getElementById("formularioCrearAula");

		const selection = (franja) => {
			if(disponibilidad.find(f => f.replaceAll(" ", "")===franja.replaceAll(" ", "")) !== undefined){
				setDisponibilidad(disponibilidad.filter(f => f !== franja));
			}else{
				setDisponibilidad([...disponibilidad, franja]);
			}
		}

    return (
        <>
            <div className="containerBotonesAulas">

                <button className="buttonAulas" onClick={()=>{
									formCrearAula.showModal();
								}}>Crear Aula</button>

                {aulaSeleccionada === null? 
                    <button className="pseudoDisabledButton"
                    onClick={() => {
                    swal({
                        icon: "info",
                        title: "Ningún aula ha sido seleccionada",
                    })
                    }}>Modificar aula
                    </button>
                    :
                    <button className="buttonAulas" onClick={() => {
						setId(aulaSeleccionada.Id);
						setCapacidad(aulaSeleccionada.Capacidad);
						setDisponibilidad([]);
						setModificar(true);
						formCrearAula.showModal();
                    }}>
                    Modificar aula
                </button>
                }

                {aulaSeleccionada === null?
                    <button className="pseudoDisabledButton"
                    onClick={() => {
                    swal({
                        icon: "info",
                        title: "Ningún aula ha sido seleccionada",
                    })
                    }}>Borrar aula
                    </button>
                    :
                    <button className="buttonAulasBorrar"
                    onClick={() => {
                        aulasServices.borrarAula(aulaSeleccionada, data, setData);
                    }}>
                    <img src={papelera} className="icono" alt="" />
                    Borrar aula
                </button>
                }

                <button className="buttonAulas" onClick={() => {sedesServices.abrirSede(sede);}}>
                    Volver
                </button>

                <dialog id = "formularioCrearAula" className="customDialog">
                    <form className="form2" onSubmit={() => {
                            if(modificar)
								aulasServices.modificarAula(id, capacidad, disponibilidad.toString(), aulaSeleccionada, data, setData);
							else
                                aulasServices.insertarAula(data, setData, id, capacidad, disponibilidad.toString(), sede);
                                //formCrearAula.close();
							}
                        }>
                        <h2>{modificar ? "Modificar" : "Crear"} Aula</h2>
                        <label><input placeholder="ID" type="text" value={id} onChange={(event) => setId(event.target.value)} /></label>
                        <br />
                        <br />
                        <label><input placeholder="Capacidad" type="number" value={capacidad} onChange={(event) => setCapacidad(event.target.value)} /></label>
                        <br />
                        <br />
												<select multiple={true}>
													<option value={"Primera franja de Primer día"} onClick={(e) => {selection(e.target.value)}}>Primera franja de Primer día</option>
													<option value={"Segunda franja de Primer día"} onClick={(e) => {selection(e.target.value)}}>Segunda franja de Primer día</option>
													<option value={"Tercera franja de Primer día"} onClick={(e) => {selection(e.target.value)}}>Tercera franja de Primer día</option>
													<option value={"Primera franja de Segundo día"} onClick={(e) => {selection(e.target.value)}}>Primera franja de Segundo día</option>
													<option value={"Segunda franja de Segundo día"} onClick={(e) => {selection(e.target.value)}}>Segunda franja de Segundo día</option>
													<option value={"Tercera franja de Segundo día"} onClick={(e) => {selection(e.target.value)}}>Tercera franja de Segundo día</option>
													<option value={"Primera franja de Tercer día"} onClick={(e) => {selection(e.target.value)}}>Primera franja de Tercer día</option>
													<option value={"Segunda franja de Tercer día"} onClick={(e) => {selection(e.target.value)}}>Segunda franja de Tercer día</option>
													<option value={"Tercera franja de Tercer día"} onClick={(e) => {selection(e.target.value)}}>Tercera franja de Tercer día</option>
												</select>
                        <br />
                        <button className="buttonForm2" type="submit">Aceptar</button>
                        <br />
                        <br />
                        <br />
                        <button className="buttonForm2" onClick={()=>{setId("");formCrearAula.close()}}>Cerrar</button>
                    </form>
                </dialog>
            </div>
        </>
    )
}