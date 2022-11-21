import React from "react";
import "../assets/css/App.css";
import logo from "../assets/images/logoNuevo.png";
import sede from "../assets/images/sedepng.png";
import estudiante from "../assets/images/estudiantepng.png";

export default function Home() {
  return (
    <>
      <div className="divHome">
        <h1>Bienvenido a la plataforma infoEVAU</h1>

        <br />

        <img className="imagenLogo" src={logo} alt="logo" />

        <br />

        <div className="twoRows">
          <a href="./alumnos">
            <div className="section">
              <p>Alumnos</p>
              <img
                className="imagenSection"
                alt="alumnosimage"
                src={estudiante}
              />
            </div>
          </a>

          <a href="./sedes">
            <div className="section">
              <p>Sedes</p>
              <img className="imagenSection" alt="sedesimage" src={sede} />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
