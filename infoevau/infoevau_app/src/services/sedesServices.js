import axios from "axios";
import swal from 'sweetalert';

const insertarSedes = (sedes) => {
  axios.post("http://localhost:3001/nuevasSedes", {
    sedes: sedes.slice(1, sedes.length),
  });
  return sedes.slice(1, sedes.length).map((sede) => {
    return { Nombre: sede };
  });
};

const borrarSede = (sede, sedesMemoria) => {
  if (sede) {
    axios.post("http://localhost:3001/borrarSede", {
      sedeBorrar: sede,
    });
    swal({
      icon: "success",
      title: "Sede eliminada",
      text: "La sede " + sede + " se eliminó correctamente"
    });
    return sedesMemoria.filter((sedeMemoria) => sedeMemoria.Nombre !== sede);
  } else {
    swal({
      icon: "error",
      text: "Ninguna sede ha sido seleccionada"
    });
  }
  return sedesMemoria;
}

const modificarSede = (sede, sedesMemoria) => {
  if (sede) {
    let sedeModif = prompt("Introduzca un nuevo nombre de sede", sede);
    if (sedeModif != null && sedeModif !== "" && sedeModif.charAt(0) !== " ") {
      axios.post("http://localhost:3001/modificarSede", {
        prevSede: sede,
        postSede: sedeModif,
      });
      sedesMemoria.find((s) => s.Nombre === sede).Nombre = sedeModif;
      return sedesMemoria.map((sedeMemoria) => {
        if (sedeMemoria.Nombre === sede) {
          return { ...sedeMemoria, Nombre: sedeModif };
        }
        return sedeMemoria;
      });  
    }
  } else {
    swal({
      icon: "error",
      text: "Ninguna sede ha sido seleccionada"
    });
  }
  return sedesMemoria;
};

const abrirResponsablesSede = (sede) => {
  if(sede != null){
    window.location.href = "/sedes/" + sede.replace("/","-") + "/responsables";
  } else{
    swal({
      icon: "error",
      text: "Ninguna sede ha sido seleccionada"
    });
  }
}

const abrirInstitutosSede = (sede) => {
  if (sede != null) {
    window.location.href = "/sedes/" + sede.replace("/","-") + "/institutos";
  } else {
    swal({
      icon: "error",
      text: "Ninguna sede ha sido seleccionada"
    });
  }
}

const abrirAulasSede = (sede) => {
  if (sede != null) {
    window.location.href = "/sedes/" + sede.replace("/","-") + "/aulas";
  } else {
    swal({
      icon: "error",
      text: "Ninguna sede ha sido seleccionada"
    });
  } 
}

const sedesServices = { insertarSedes, borrarSede, modificarSede, abrirResponsablesSede, 
    abrirInstitutosSede, abrirAulasSede };

export default sedesServices;
