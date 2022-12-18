import { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/Institutos.css";
import TablaInstitutos from "./TablaInstitutos.jsx"
import BotonesInstitutos from "./BotonesInstitutos"
import { useParams } from "react-router-dom";
import TablaInstitutosAsignados from "./TablaInstitutosAsignados";

export default function InstitutosSede() {
    let params = useParams();
    let idSede = params.idSede.replace("$","/");
    const [institutoSeleccionadoDisp, setInstitutoSeleccionadoDisp] = useState(null);
		const [institutoSeleccionadoAsig, setInstitutoSeleccionadoAsig] = useState(null);
		const [dataAsig, setDataAsig] = useState([]);
		const [dataDisp, setDataDisp] = useState([]);
		const [capacidadSede, setCapacidadSede] = useState(0);

    useEffect(() => {
      axios.post("http://localhost:3001/institutosAsignados",{
        sede: idSede
      }).then((institutosAsig) => {
        setDataAsig(institutosAsig.data);
      });

			axios.get("http://localhost:3001/institutosDisponibles").then((institutosDisp) => {
        setDataDisp(institutosDisp.data);
      });
    }, [idSede]);

    return (
    <>
        <div className="containerHeaderInstitutos">
            <h2>Institutos asignados a la sede {idSede}</h2>
        </div>
        <TablaInstitutos 
            idSede = {idSede}
						data={dataDisp}
						dataAsig={dataAsig}
						institutoSeleccionado={institutoSeleccionadoDisp}
						setInstitutoSeleccionado={setInstitutoSeleccionadoDisp}
						asignadoSelec={institutoSeleccionadoAsig}
            capacidadSede={capacidadSede}
            setCapacidadSede={setCapacidadSede}
        />
        <BotonesInstitutos 
            idSede = {idSede}
						dataAsig={dataAsig}
						setDataAsig={setDataAsig}
						dataDisp={dataDisp}
						setDataDisp={setDataDisp}
						institutoSeleccionadoDisp={institutoSeleccionadoDisp}
						setInstitutoSeleccionadoDisp={setInstitutoSeleccionadoDisp}
						institutoSeleccionadoAsig={institutoSeleccionadoAsig}
						setInstitutoSeleccionadoAsig={setInstitutoSeleccionadoAsig}
            capacidadSede={capacidadSede}
        />
        <TablaInstitutosAsignados 
            idSede={idSede}
						dataAsig={dataAsig}
						institutoSeleccionado={institutoSeleccionadoAsig}
						setInstitutoSeleccionado={setInstitutoSeleccionadoAsig}
        />
    </>)
}
