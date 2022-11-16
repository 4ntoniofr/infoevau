import React from 'react'

function TablaAlumnos() {
    return (
        <>
            <table className='tablaAlumnos'>
			<thead>
				<tr>
					<th scope="col">Instituto</th>
					<th scope="col">Nombre</th>
					<th scope="col">Apellido1</th>
					<th scope="col">Apellido2</th>
					<th scope="col">DNI/NIF</th>
					<th scope="col">Materias</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Santa Bárbara</td>
					<td>Nacho</td>
					<td>Rizos</td>
					<td>Aviles</td>
					<td>1111111X</td>
					<td>Matemáticas, Historia, Física</td>
				</tr>
				<tr>
					<td>Fuenteolletas</td>
					<td>Jorge</td>
					<td>Camacho</td>
					<td>Minimoy</td>
					<td>12345678C</td>
					<td>Lengua, Inglés</td>
				</tr>
				<tr>
					<td>Estepa</td>
					<td>Antonio</td>
					<td>Cateto</td>
					<td>Aceituna</td>
					<td>No tiene</td>
					<td>Sistemas inteligentes</td>
				</tr>
				<tr>
					<td>Benalmadena</td>
					<td>Pepe</td>
					<td>Terrorista</td>
					<td>Artacho</td>
					<td>Ilegal</td>
					<td>Todas las de amparo</td>
				</tr>
				<tr>
					<td>Benalmadena</td>
					<td>Valentin</td>
					<td>Va</td>
					<td>Lentin</td>
					<td>09876544D</td>
					<td>Filosofía XD</td>
				</tr>
			</tbody>
		  </table>
        </>
    )
}

export default TablaAlumnos;