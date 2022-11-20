import React from "react";
import TablaSedes from "./TablaSedes";
import BotonesSedes from "./BotonesSedes";
import "../../assets/css/Sedes.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Sedes() {
  const [sedeSeleccionada, setSedeSeleccionada] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/sedes").then((sedes) => {
      setData(sedes.data);
      console.log(sedes.data);
    });
  }, []);

  return (
    <>
      <div className="containerHeaderSedes">
        <h1>Sección de las sedes</h1>
      </div>
      <TablaSedes
        data={data}
        sedeSeleccionada={sedeSeleccionada}
        setSedeSeleccionada={setSedeSeleccionada}
      />
      <BotonesSedes
        data={data}
        setData={setData}
        sedeSeleccionada={sedeSeleccionada}
        setSedeSeleccionada={setSedeSeleccionada}
      />
    </>
  );
}
