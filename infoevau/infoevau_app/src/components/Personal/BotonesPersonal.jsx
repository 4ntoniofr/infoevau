import "../../assets/css/Aulas.css"

export default function BotonesPersonal(aulaSeleccionada, personalSeleccionado) {

    const asignarResponsable = (aula, responsable) => {
        if(responsable.Responsable == null){
            alert("Deber seleccionar un responsable.")
        }else if(aula.Id == null){
            alert("Debe seleccionar un aula")
        }else if(responsable.Rol != null){
            alert("El personal seleccionado ya tiene un rol en ese horario.");
        }else if(aula.Responsable != null){
            alert("El aula seleccionada ya tiene un responsable asignado.");
        }else{
            alert("importado")
        }
    }

    return (
        <>
            <div className="containerBotonesPersonal">

            <button className="buttonPersonal"
            onClick={() => asignarResponsable(aulaSeleccionada, personalSeleccionado)}
            >Asignar Responsable</button>


            <button className="buttonPersonal"
            >Asignar Vigilante</button>


            <button className="buttonPersonal"
            >Desasignar</button>

            </div>
        </>
    )
}