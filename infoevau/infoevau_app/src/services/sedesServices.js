import axios from "axios";

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
    return sedesMemoria.filter((sedeMemoria) => sedeMemoria.Nombre !== sede);
  } else {
    window.alert("Debes seleccionar una sede a eliminar.");
  }
  return sedesMemoria;
}

const modificarSede = (sede, sedesMemoria) => {
  if (sede) {
    let sedeModif = prompt("Introduzca un nuevo nombre de sede", sede);
    if (sedeModif != null && sedeModif != "" && sedeModif.charAt(0) != " ") {
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
    window.alert("Debes seleccionar una sede.");
  }
  return sedesMemoria;
};

const abrirResponsablesSede = (sede) => {
  if(sede != null){
    window.open("/sedes/" + sede.replace("/","-") + "/responsables");
  } else{
    window.alert("Debes seleccionar una sede.")
  }
}

const abrirInstitutosSede = (sede) => {
  if (sede != null) {
    window.open("/sedes/" + sede.replace("/","-") + "/institutos");
  } else {
    window.alert("Debes seleccionar una sede.");
  }
}

const abrirAulasSede = (sede) => {
  if (sede != null) {
    window.open("/sedes/" + sede.replace("/","-") + "/aulas");
  } else {
    window.alert("Debes seleccionar una sede.");
  } 
}

const sedesServices = { insertarSedes, borrarSede, modificarSede, abrirResponsablesSede, 
    abrirInstitutosSede, abrirAulasSede };

export default sedesServices;
