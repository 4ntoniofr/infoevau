import React from 'react';
import logo from './assets/images/logoNuevo.png';

function Navbar() {
	return (
		<header id="header">
			<nav className='navbar'>
				<ul>
					<a href="."><img src={logo} className='imgNavbar' alt="" width="50" height="50"/></a>
           	 <li><a href="/alumnos">Alumnos</a></li>
           	 <li><a href="/sedes">Sedes</a></li>
				</ul>
			</nav>
		</header>
	)
}

export default Navbar