import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


function seleccionarSede(sede) {
    console.log('Nombre: ' + sede);
}

function TablaSedes() {
const [data, setData] = useState([]);
useEffect(() => {
    axios.get("http://localhost:3001/sedes").then((sedes) => {
    setData(sedes.data);
    });
});

    return (
       <>
            <div className="containerTablaSedes">
                <table className="tablaSedes">
                    <thead>
                        <tr>
                            <th>Sedes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((sedes,key) => (
                                    <tr key={key}>
                                    <td onClick={() => {seleccionarSede(sedes.Nombre)}}>{sedes.Nombre}</td>
                                    </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
       </>
    )
}

export default TablaSedes;