import React from 'react'
import logo from './assets/images/logoNuevo.png';

function Home() {
  return (
    <React.StrictMode>
      <body>
        <header id='header'>
         <nav className='navbar'>
            <ul>
              <a href="."><img src={logo} className='imgNavbar' alt="" width="50" height="50"/></a>
              <li><a href="/alumnos">Alumnos</a></li>
              <li><a href="/sedes">Sedes</a></li>
            </ul>
          </nav>
        </header>
        <h1>Bienvenido al main page</h1>
        <h2><a href="./alumnos">Ir a la seccion de alumnos</a></h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
        <h2>Hola</h2>
      </body>
    </React.StrictMode>
  )
}

export default Home