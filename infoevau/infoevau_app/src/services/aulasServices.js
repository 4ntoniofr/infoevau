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
  if(id !== "" && id !== undefined){
		axios.post("http://localhost:3001/nuevaAula", {
    	Id: id,
    	Capacidad: capacidad,
    	Disponibilidad: disponibilidad,
    	Sede: sede,
  	}).then(() => {
			setAulasMemoria([...aulasMemoria, {Id: id, Capacidad: capacidad, Disponibilidad: disponibilidad, Sede: sede}].sort(orderId));
		});
	}
};

const modificarAula = async (id, capacidad, disponibilidad, aulaSeleccionada, aulasMemoria, setAulasMemoria) => {

	await axios.post("http://localhost:3001/borrarAulasId", {aulaBorrar: aulaSeleccionada}).then(() => {
		let aulas = aulasMemoria.filter(a => a.Id !== aulaSeleccionada.Id);
		insertarAula(aulas, setAulasMemoria, id, capacidad, disponibilidad, aulaSeleccionada.Sede);
	});

};

const orderId = (a,b) => {
	if(a.Id < b.Id) return -1;
	else if(a.Id > b.Id) return 1;
	else return 0;
};

const aulasServices = { borrarAula, insertarAula, modificarAula }

export default aulasServices;