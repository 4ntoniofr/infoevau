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

    setAulasMemoria(aulasMemoria.filter((a) => a.Id !== aula.Id));
  } else {
    swal({
      icon: "error",
      text: "Ningún aula ha sido seleccionada"
    });
		setAulasMemoria(aulasMemoria);
  }
}

const insertarAula = (aulasMemoria, setAulasMemoria, id, capacidad, disponibilidad, sede) => {
  
  axios.post("http://localhost:3001/nuevaAula", {
    Id: id,
    Capacidad: capacidad,
    Disponibilidad: disponibilidad,
    Sede: sede,
  });

  aulasMemoria.push({Id: id, Capacidad: capacidad, Disponibilidad: disponibilidad, Sede: sede});
	setAulasMemoria(aulasMemoria)
};

const modificarAula = (id, capacidad, disponibilidad, aulaSeleccionada, aulasMemoria, setAulasMemoria) => {
    
	axios.post("http://localhost:3001/modificarAula", {
    prevID: aulaSeleccionada.Id,
		sedeAula: aulaSeleccionada.Sede,
		postID: id,
		postCapacidad: capacidad,
		postDisponibilidad: disponibilidad
  });

	let aula = aulasMemoria.find((a) => a.Id === aulaSeleccionada.Id);
	aula.Id = id;
	aula.Capacidad = capacidad;
	aula.Disponibilidad = disponibilidad;
	setAulasMemoria(aulasMemoria);
};

const aulasServices = { borrarAula, insertarAula, modificarAula }

export default aulasServices;