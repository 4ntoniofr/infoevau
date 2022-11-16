import React from "react";
import logo from "../assets/images/logoNuevo.png";

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
              <p>Alumnos</p>
            </li>
          </a>
          <a href="/sedes">
            <li>
              <p>Sedes</p>
            </li>
          </a>
        </ul>
      </nav>
    </header>
  );
}
