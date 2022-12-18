import { useParams } from "react-router-dom";
import "../../assets/css/Personal.css"
import { useState, useEffect } from "react";
import BotonesPersonal from "./BotonesPersonal";
import TablaAulas from "../Aulas/TablaAulas";
import TablaPersonal from "./TablaPersonal";
import axios from "axios";
import TablaAulasSeparadas from "./TablaAulasSeparada";

export default function PersonalSede() {
    let params = useParams();
    let idSede = params.idSede.replace("$","/");

    const [aulaSeleccionada, setAulaSeleccionada] = useState(null);
    const [dataAulas, setDataAulas] = useState([]);

    const [personalSeleccionado, setPersonalSeleccionado] = useState(null);
    const [dataPersonal, setDataPersonal] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:3001/aulas", { sede: idSede }).then((a) => {
            let aulas = [];
            a.data.map((aula) => {
                aula.Disponibilidad.split(",").map((d) => {
                    aulas.push({Id:aula.Id, Capacidad:aula.Capacidad, Disponibilidad: d, Sede:aula.Sede, Responsable:aula.Responsable});
                })
            })
            setDataAulas(aulas);
        });

        axios.post("http://localhost:3001/personal", {sede:idSede}).then((p) => {
            setDataPersonal(p.data.sort(compare));
        });

    }, []);

    function compare (a, b){
            if(a.Responsable > b.Responsable){
                return 1;
            }else{
                return -1;
    }

    }

    return (
        <>
            <div className="containerHeader">
                <h2>Personal de la sede {idSede}</h2>
            </div>

            <TablaAulasSeparadas data={dataAulas} aulaSeleccionada = {aulaSeleccionada} setAulaSeleccionada = {setAulaSeleccionada}/>

            <BotonesPersonal aulaSeleccionada={aulaSeleccionada} personalSeleccionado={personalSeleccionado} dataPersonal = {dataPersonal} setDataPersonal = {setDataPersonal} dataAulas = {dataAulas} setDataAulas ={setDataAulas} setAulaSeleccionada={setAulaSeleccionada} setPersonalSeleccionado={setPersonalSeleccionado}/>

            <TablaPersonal data = {dataPersonal} personalSeleccionado = {personalSeleccionado} setPersonalSeleccionado={setPersonalSeleccionado}/>
        </>
    )
}