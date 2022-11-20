import React from "react";
import '../assets/css/App.css'
import logo from '../assets/images/logoNuevo.png'
import sede from '../assets/images/sedepng.png'
import estudiante from '../assets/images/estudiantepng.png'

export default function Home() {
  return (
    <>
      <div className="divHome">

        <h1>Bienvenido a la plataforma infoEVAU</h1>

        <br/>

        <img className="imagenLogo" src={logo} alt="logo" />

        <br/>
        

        <div className="twoRows">

          <div className="section">

            <a href="./alumnos">
              <img className="imagenSection" alt="alumnosimage" src={estudiante} />
            </a>

          </div>

          <div className="section">

            <a href="./sedes">
              <img className="imagenSection" alt="sedesimage" src={sede} />
            </a>

          </div>

        </div>
      </div>
    </>
  );
}
