export default function TablaInstitutosAsignados ({idSede, dataAsig, institutoSeleccionado, setInstitutoSeleccionado}) {

    return (
        <>
        <div className="containerTablaInstitutosAsignados">
        <table className="tablaInstitutos">
				<thead>
					<tr>
						<th>Institutos asignados</th>
						<th>Num alumnos</th>
					</tr>
				</thead>
				<tbody>
				{dataAsig.map((instituto,key) => {
					if (instituto === institutoSeleccionado) {
						console.log("Instituto asignado seleccionado: " + instituto.Nombre);
						return (
							<tr key={key} style={{ backgroundColor: "#80ff80" }}>
                    			<td
                      				onClick={() => {
                        				setInstitutoSeleccionado(null);
                      				}}
                    			>
                      			{instituto.Nombre}</td>
								<td
									onClick={() => {
										setInstitutoSeleccionado(null);
									}}
								>
								{instituto.NumAlumnos}</td>
                  			</tr>
						);
					}
					return (
						<tr key={key}>
							<td
								onClick={() => {
									setInstitutoSeleccionado(instituto);
								}}
							>
							{instituto.Nombre}</td>
							<td
								onClick={() => {
									setInstitutoSeleccionado(instituto);
								}}
							>
							{instituto.NumAlumnos}</td>
						</tr>
					);
				})}
				</tbody>
			</table>
        </div>
        </>
    )
}