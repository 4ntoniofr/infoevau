import React from "react";
import logo from "../assets/images/logoNuevo.png";
import imgSedes from "../assets/images/sedepng.png";
import imgAlumnos from "../assets/images/estudiantepng.png";
import imgUsuarios from "../assets/images/usuarios.png";
import imgExamenes from "../assets/images/examen.png";

export default function Navbar() {
  return (
    <header id="header">
      <nav className="navbar">
        <ul>
          <a href="http://localhost:3000">
            <img src={logo} className="imgNavbar" alt="logo" />
          </a>
          <a href="/alumnos">
            <li>
              <img src={imgAlumnos} alt="" className="iconoNavbar2"/>
              <p>Alumnos</p>
            </li>
          </a>
          <a href="/examenes">
            <li>
              <img src={imgExamenes} alt="" className="iconoNavbar"/>
              <p>Exámenes</p>  
            </li>
          </a>
          <a href="/sedes">
            <li>
              <img src={imgSedes} alt="" className="iconoNavbar"/>
              <p>Sedes</p>  
            </li>
          </a>
          <a href="/sedes/responsablesSede">
            <li>
              <img src={imgUsuarios} alt="" className="iconoNavbar"/>
              <p>Responsables</p>  
            </li>
          </a>
        </ul>
      </nav>
    </header>
  );
}
