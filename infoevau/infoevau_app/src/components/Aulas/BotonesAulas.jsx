import React from "react";
import "../../assets/css/Aulas.css"
import papelera from "../../assets/images/papelera.png";
import aulasServices from "../../services/aulasServices";
import swal from 'sweetalert';
import { useState } from "react";
import sedesServices from "../../services/sedesServices";
import { useRef } from "react";
import Select from 'react-select';

export default function BotonesAulas({ data, setData, aulaSeleccionada, setAulaSeleccionada, idSede }) {

    const select = useRef(null);

    const [id, setId] = useState("")
    const [capacidad, setCapacidad] = useState(0)
    //const [disponibilidad, setDisponibilidad] = useState([])
    const [modificar, setModificar] = useState(false)
    const [codigo, setCodigo] = useState(0)
    let sede = idSede;

    const formCrearAula = document.getElementById("formularioCrearAula");

    const selectionFranja = useRef(null);

    const options = [
        { value: 'Primera franja de Primer día', label: 'Primera franja de Primer día' },
        { value: 'Segunda franja de Primer día', label: 'Segunda franja de Primer día' },
        { value: 'Tercera franja de Primer día', label: 'Tercera franja de Primer día' },
        { value: 'Primera franja de Segundo día', label: 'Primera franja de Segundo día' },
        { value: 'Segunda franja de Segundo día', label: 'Segunda franja de Segundo día' },
        { value: 'Tercera franja de Segundo día', label: 'Tercera franja de Segundo día' },
        { value: 'Primera franja de Tercer día', label: 'Primera franja de Tercer día' },
        { value: 'Segunda franja de Tercer día', label: 'Segunda franja de Tercer día' },
        { value: 'Tercera franja de Tercer día', label: 'Tercera franja de Tercer día' },
    ]

    return (
        <>
            <div className="containerBotonesAulas">

                <button className="buttonAulas" onClick={() => {
                    formCrearAula.showModal();
                    setModificar(false);
                }}>Crear Aula</button>

                {aulaSeleccionada === null ?
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
                        setModificar(true);
                        formCrearAula.showModal();
                        setId(aulaSeleccionada.Id);
                        setCapacidad(aulaSeleccionada.Capacidad);
                        selectionFranja.clearValue();
                    }}>
                        Modificar aula
                    </button>
                }

                {aulaSeleccionada === null ?
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



                <button className="buttonAulas" onClick={() => { sedesServices.abrirSede(sede); }}>
                    Volver
                </button>

                <dialog id="formularioCrearAula" className="customDialogAula">
                    <form className="formAula" onSubmit={(event) => {
                        event.preventDefault();

                        let disponibilidad = [];
                        selectionFranja.current.getValue().forEach((x) => {
                            disponibilidad.push(x.value);
                        });

                        if (capacidad <= 0) {
                            swal({
                                icon: "info",
                                title: "Capacidad introducida no valida"
                            });
                        } else {
                            if (modificar) {
                                aulasServices.modificarAula(id, capacidad, disponibilidad.toString(), aulaSeleccionada, data, setData);
                                setId("");
                                setCapacidad(0);
                                selectionFranja.current.clearValue();
                                setAulaSeleccionada(null);
                            }
                            else {
                                if (data.find(a => a.Id === id) !== undefined) {
                                    swal({
                                        icon: "info",
                                        title: "Id de aula ya en uso"
                                    });
                                } else {
                                    aulasServices.insertarAula(data, setData, id, capacidad, disponibilidad.toString(), sede);
                                    setId("");
                                    setCapacidad(0);
                                    selectionFranja.current.clearValue();
                                    setAulaSeleccionada(null);
                                }
                            }
                        }
                        formCrearAula.close();
                    }
                    }>
                        <h2>{modificar ? "Modificar" : "Crear"} Aula</h2>
                        <label><input placeholder="ID" type="text" value={id} onChange={(event) => setId(event.target.value)} /></label>
                        <br />
                        <br />
                        <label><input placeholder="Capacidad" type="number" value={capacidad} onChange={(event) => setCapacidad(event.target.value)} /></label>
                        <br />
                        <br />
                        <Select
                            ref={selectionFranja}
                            closeMenuOnSelect={false}
                            isMulti
                            options={options}
                        />
                        <br />
                        <button className="buttonForm2" type="submit">Aceptar</button>
                        <br />
                        <br />
                        <br />
                        <button className="buttonForm2" onClick={() => { setId(""); formCrearAula.close() }}>Cerrar</button>
                    </form>
                </dialog>


            </div>

        </>
    )
}