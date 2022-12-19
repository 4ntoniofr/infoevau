import "../../assets/css/Aulas.css"
import axios from "axios";
import swal from "sweetalert";

export default function BotonesPersonal({sede, aulaSeleccionada, personalSeleccionado, dataPersonal, setDataPersonal, dataAulas, setDataAulas, setAulaSeleccionada, setPersonalSeleccionado}) {

    const asignarResponsable = (aula, responsable) => {
        if(responsable == null){
            swal({
                icon: "info",
                title: "Ningun responsable seleccionado"
            })
        }else if(aula == null){
            swal({
                icon: "info",
                title: "Ningun aula seleccionada"
            })
        }else if(responsable.Rol != null){
            swal({
                icon: "info",
                title: "El personal seleccionado ya tiene un rol en ese horario."
            })
        }else if(aula.Responsable != null){
            swal({
                icon: "info",
                title: "El aula seleccionada ya tiene un responsable asignado."
            })
        }else if(aula.Disponibilidad !== responsable.Momento){
            swal({
                icon: "info",
                title: "Los horarios del aula y el personal no coinciden."
            })
        }
        else{
            axios.post("http://localhost:3001/asignarResponsableAula", {
                responsable: responsable.Responsable,
                disponibilidad: responsable.Momento,
                aula: aula.Id,
                sede: sede
            });

            dataPersonal.find(r => r.Responsable === responsable.Responsable && r.Momento === responsable.Momento).Aula = aula.Id;
            dataPersonal.find(r => r.Responsable === responsable.Responsable && r.Momento === responsable.Momento).Rol = "Responsable";
            dataAulas.find(a => a.Id === aula.Id && a.Disponibilidad === aula.Disponibilidad).Responsable = responsable.Responsable;
            setDataPersonal(dataPersonal);
            setDataAulas(dataAulas);
            setAulaSeleccionada(null);
            setPersonalSeleccionado(null);
        }
    }

    const asignarVigilante = (aula, vigilante) => {
        if(vigilante == null){
            swal({
                icon: "info",
                title: "Ningun personal seleccionado"
            })
        }else if(aula == null){
            swal({
                icon: "info",
                title: "Debe seleccionar un aula"
            })
        }else if(vigilante.Rol != null){
            swal({
                icon: "info",
                title: "El personal seleccionado ya tiene un rol en ese horario."
            })
        }else if(aula.Disponibilidad !== vigilante.Momento){
            swal({
                icon: "info",
                title: "Los horarios del aula y el personal no coinciden."
            })
        }
        else{
            axios.post("http://localhost:3001/asignarVigilanteAula", {
                vigilante: vigilante.Responsable,
                aula: aula.Id,
                disponibilidad: vigilante.Momento,
                sede: sede
            });

            dataPersonal.find(r => r.Responsable === vigilante.Responsable && r.Momento === vigilante.Momento).Aula = aula.Id;
            dataPersonal.find(r => r.Responsable === vigilante.Responsable && r.Momento === vigilante.Momento).Rol = "Vigilante";
            setDataPersonal(dataPersonal);
            setAulaSeleccionada(null);
            setPersonalSeleccionado(null);
        }
    }

    const desasignarPersonal = (personal) => {
        if(personal==null){
            swal({
                icon: "info",
                title: "Ningun personal seleccionado"
            })
        }else if(personal.Aula == null){
            swal({
                icon: "info",
                title: "El personal seleciconado no es Responsable o Vigilante de ningún aula."
            })
        }else{
            axios.post("http://localhost:3001/desasignarPersonal", {
                personal: personal.Responsable,
                aula: personal.Aula,
                disponibilidad: personal.Momento,
                sede: sede
            });

            dataAulas.find(a => a.Id === personal.Aula && a.Disponibilidad === personal.Momento).Responsable = null;
            dataPersonal.find(r => r.Responsable === personal.Responsable && r.Momento === personal.Momento).Aula = null;
            dataPersonal.find(r => r.Responsable === personal.Responsable && r.Momento === personal.Momento).Rol = null;
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