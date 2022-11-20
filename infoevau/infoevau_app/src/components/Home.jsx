import React from "react";
import '../assets/css/App.css'
import logo from '../assets/images/logoNuevo.png'
import sede from '../assets/images/sedepng.png'
import estudiante from '../assets/images/estudiantepng.png'

/*
<div class="w3-row-padding w3-auto">
  <div class="w3-third">
      <h2>London</h2>
      <p>London is the most populous city in the United Kingdom,
      with a metropolitan area of over 13 million inhabitants.</p>
  </div>
  <div class="w3-third">
      <h2>Paris</h2>
      <p>The Paris area is one of the largest population centers in Europe,
      with more than 12 million inhabitants.</p>
  </div>
  <div class="w3-third">
      <h2>Tokyo</h2>
      <p>Tokyo is the center of the Greater Tokyo Area,
      and the most populous metropolitan area in the world.</p>
  </div>
*/

export default function Home() {
  return (
    <>
      <div className="divHome">

        <h1>Bienvenido a la plataforma infoEVAU</h1>

        <br/> <br/>

        <img className="imagenLogo" src={logo} alt="logo" />

        <br/>
        

        <div className="twoRows">

          <div className="section">

            <a href="./alumnos">
              <img className="imagenSection" src={estudiante} />
            </a>

          </div>

          <div className="section">

            <a href="./sedes">
              <img className="imagenSection" src={sede} />
            </a>

          </div>

        </div>
      </div>
    </>
  );
}
