import "../../assets/css/Aulas.css"
import axios from "axios";

export default function BotonesPersonal({sede, aulaSeleccionada, personalSeleccionado, dataPersonal, setDataPersonal, dataAulas, setDataAulas, setAulaSeleccionada, setPersonalSeleccionado}) {

    const asignarResponsable = (aula, responsable) => {
        if(responsable == null){
            alert("Deber seleccionar un personal.")
        }else if(aula == null){
            alert("Debe seleccionar un aula")
        }else if(responsable.Rol != null){
            alert("El personal seleccionado ya tiene un rol en ese horario.");
        }else if(aula.Responsable != null){
            alert("El aula seleccionada ya tiene un responsable asignado.");
        }else if(aula.Disponibilidad !== responsable.Momento){
            alert("Los horarios del aula y el personal no coinciden.");
        }
        else{
            axios.post("http://localhost:3001/asignarResponsableAula", {
                responsable: responsable.Responsable,
                aula: aula.Id,
                sede: sede
            });

            dataPersonal.find(r => r.Responsable === responsable.Responsable).Aula = aula.Id;
            dataPersonal.find(r => r.Responsable === responsable.Responsable).Rol = "Responsable";
            dataAulas.find(a => a.Id === aula.Id).Responsable = responsable.Responsable;
            setDataPersonal(dataPersonal);
            setDataAulas(dataAulas);
            setAulaSeleccionada(null);
            setPersonalSeleccionado(null);
        }
    }

    const asignarVigilante = (aula, vigilante) => {
        if(vigilante == null){
            alert("Deber seleccionar un personal.")
        }else if(aula == null){
            alert("Debe seleccionar un aula")
        }else if(vigilante.Rol != null){
            alert("El personal seleccionado ya tiene un rol en ese horario.");
        }else if(aula.Disponibilidad !== vigilante.Momento){
            alert("Los horarios del aula y el personal no coinciden.");
        }
        else{
            axios.post("http://localhost:3001/asignarVigilanteAula", {
                vigilante: vigilante.Responsable,
                aula: aula.Id,
                sede: sede
            });

            dataPersonal.find(r => r.Responsable === vigilante.Responsable).Aula = aula.Id;
            dataPersonal.find(r => r.Responsable === vigilante.Responsable).Rol = "Vigilante";
            setDataPersonal(dataPersonal);
            setAulaSeleccionada(null);
            setPersonalSeleccionado(null);
        }
    }

    const desasignarPersonal = (personal) => {
        if(personal==null){
            alert("Debes seleccionar un personal");
        }else if(personal.Aula == null){
            console.log(personal.Aula)
            alert("El personal seleciconado no es Responsable o Vigilante de ningún aula.")
        }else{
            axios.post("http://localhost:3001/desasignarPersonal", {
                personal: personal.Responsable,
                aula: personal.Aula,
                sede: sede
            });

            dataAulas.find(a => a.Id === personal.Aula).Responsable = null;
            dataPersonal.find(r => r.Responsable === personal.Responsable).Aula = null;
            dataPersonal.find(r => r.Responsable === personal.Responsable).Rol = null;
            setDataPersonal(dataPersonal);
            setDataAulas(dataAulas);
            setAulaSeleccionada(null);
            setPersonalSeleccionado(null);
        }
    }

    return (
        <>
            <div className="containerBotonesPersonal">

            <button className="buttonPersonal"
            onClick={() => asignarResponsable(aulaSeleccionada, personalSeleccionado)}
            >Asignar Responsable</button>


            <button className="buttonPersonal"
            onClick={() => asignarVigilante(aulaSeleccionada, personalSeleccionado)}
            >Asignar Vigilante</button>


            <button className="buttonPersonal"
            onClick={() => desasignarPersonal(personalSeleccionado)}
            >Desasignar</button>

            </div>
        </>
    )
}