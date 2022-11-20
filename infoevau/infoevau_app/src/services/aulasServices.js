import axios from "axios";
import swal from 'sweetalert';

const borrarAula = (aula, aulasMemoria) => {
  if (aula) {
    axios.post("http://localhost:3001/borrarAula", {
      aulaBorrar: aula,
    });
    swal({
      icon: "success",
      title: "Aula eliminada",
      text: "El aula " + aula + " se eliminó correctamente"
    });
    return aulasMemoria.filter((aulasMemoria) => aulasMemoria.Nombre !== aula);
  } else {
    swal({
      icon: "error",
      text: "Ningún aula ha sido seleccionada"
    });
  }
  return aulasMemoria;
}

const insertarAula = (aulasMemoria, id, capacidad, disponibilidad, sede) => {
  
  axios.post("http://localhost:3001/nuevaAula", {
    Id: id,
    Capacidad: capacidad,
    Disponibilidad: disponibilidad,
    Sede: sede,
  });

  return aulasMemoria.push({Id: id, Capacidad: capacidad, Disponibilidad: disponibilidad, Sede: sede});
};

const modificarAula = (aula, aulasMemoria) => {
    // hay que crear un cuadro de texto o alguna nueva pestaña para modificar las aulas
};

const aulasServices = { borrarAula, insertarAula, modificarAula }

export default aulasServices;