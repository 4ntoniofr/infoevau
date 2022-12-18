import axios from "axios";
import swal from 'sweetalert';

const borrarAula = (aula, aulasMemoria, setAulasMemoria) => {
  if (aula) {
    axios.post("http://localhost:3001/borrarAula", {
      aulaBorrar: aula,
    });
    swal({
      icon: "success",
      title: "Aula eliminada",
      text: "El aula " + aula.Id + " de la sede " + aula.Sede + " se eliminó correctamente"
    });

    setAulasMemoria(aulasMemoria.filter((a) => a.Id !== aula.Id || a.Disponibilidad !== aula.Disponibilidad));
  } else {
    swal({
      icon: "error",
      text: "Ningún aula ha sido seleccionada"
    });
		setAulasMemoria(aulasMemoria);
  }
}

const insertarAula = (aulasMemoria, setAulasMemoria, id, capacidad, disponibilidad, sede) => {

  if(id !== "" && id !== undefined){
		axios.post("http://localhost:3001/nuevaAula", {
    	Id: id,
    	Capacidad: capacidad,
    	Disponibilidad: disponibilidad,
    	Sede: sede,
  	}).then(() => {
		disponibilidad.split(",").map((d) => {
			aulasMemoria.push({Id: id, Capacidad: capacidad, Disponibilidad: d, Sede: sede});
		})
			setAulasMemoria(aulasMemoria);
		});
	}
};

const modificarAula = (id, capacidad, disponibilidad, aulaSeleccionada, aulasMemoria, setAulasMemoria) => {

	axios.post("http://localhost:3001/borrarAulasId", {aulaBorrar: aulaSeleccionada});
	insertarAula(aulasMemoria, setAulasMemoria, id, capacidad, disponibilidad, aulaSeleccionada.Sede);

};

const aulasServices = { borrarAula, insertarAula, modificarAula }

export default aulasServices;