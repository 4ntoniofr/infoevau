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

const aulasServices = {borrarAula}

export default aulasServices;