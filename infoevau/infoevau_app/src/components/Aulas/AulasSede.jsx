import React from "react";
import { useParams } from "react-router-dom";
import "../../assets/css/Aulas.css"
import TablaAulas from "./TablaAulas"
import BotonesAulas from "./BotonesAulas";
import axios from "axios"
import { useState, useEffect } from "react";

export default function AulasSede() {
    let params = useParams();
    let idSede = params.idSede.replace("$","/");

    const [aulaSeleccionada, setAulaSeleccionada] = useState(null);
    const [data, setData] = useState([]);
		const [dataTabla, setDataTabla] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:3001/aulas", { sede: idSede }).then((a) => {
          setData(a.data);

					setDataTabla([]);
					a.data.forEach(d => {
						let a = dataTabla.find(t => t.Id === d.Id);
						if(a === undefined){
							dataTabla.push(d);
						}else{
							a.Disponibilidad = a.Disponibilidad + "," + d.Disponibilidad;
						}
						setDataTabla(dataTabla);
					});
        });
    }, [idSede]);

    return (
        <>
            <div className="containerHeader">
                <h2>Aulas de la sede {idSede}</h2>
            </div>
            <TablaAulas
                data={dataTabla}
                aulaSeleccionada={aulaSeleccionada}
                setAulaSeleccionada={setAulaSeleccionada}
            />
            <BotonesAulas
                data={dataTabla}
                setData={setDataTabla}
                aulaSeleccionada={aulaSeleccionada}
								setAulaSeleccionada={setAulaSeleccionada}
                idSede={idSede}
            />

        </>
    )
}