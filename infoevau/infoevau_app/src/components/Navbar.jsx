import React from "react";
import logo from "../assets/images/logoNuevo.png";
import imgSedes from "../assets/images/sedepng.png"
import imgAlumnos from "../assets/images/estudiantepng.png"

export default function Navbar() {
  return (
    <header id="header">
      <nav className="navbar">
        <ul>
          <a href=".">
            <img src={logo} className="imgNavbar" alt="logo" />
          </a>
          <a href="/alumnos">
            <li>
              <img src={imgAlumnos} alt="" className="iconoNavbar"/>
              <p>Alumnos</p>
            </li>
          </a>
          <a href="/sedes">
            <li>
              <img src={imgSedes} alt="" className="iconoNavbar"/>
              <p>Sedes</p>  
            </li>
          </a>
        </ul>
      </nav>
    </header>
  );
}
