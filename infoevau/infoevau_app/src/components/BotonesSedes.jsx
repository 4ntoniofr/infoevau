import React from "react";
import Axios from 'axios';
import papelera from "../assets/images/papelera.png";

function insertarSedes(sedes) {
	console.log(sedes)
	Axios.post('http://localhost:3001/nuevasSedes', {
		sedes: sedes.slice(1, sedes.length)
	})
}

function BotonesSedes() {
    return (
        <>  
        <div className="containerBotonesSedes">
            <table className="tablaBotones">
                <thead>
                    <tr>
                        <th>Gestión de sedes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <input type="file" accept=".txt" onChange={e => {
                            e.target.files[0].text().then((t) => {
                            insertarSedes(t.split('\n'));
                            });
                         }} />
                    </tr>
                    <tr><img src={papelera} className="icono"/>Eliminar sede</tr>
                    <tr>Modificar sede</tr>
                    <tr>Importar responsables</tr>
                    <tr>Responsables</tr>
                    <tr>Asignar institutos</tr>
                    <tr>Aulas</tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

export default BotonesSedes;