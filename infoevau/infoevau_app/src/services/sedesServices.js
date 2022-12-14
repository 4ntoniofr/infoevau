import axios from "axios";
import swal from 'sweetalert';

const insertarSedes = (sedes, data, setData) => {
  axios.post("http://localhost:3001/nuevasSedes", {
    sedes: sedes.slice(1, sedes.length),
  });

  axios.get("http://localhost:3001/sedes").then((s) => {
    setData(s.data);    
  });
};

const borrarSede = (sede, sedesMemoria) => {
		axios.post("http://localhost:3001/borrarAulasSede", {
			sedeBorrar: sede,
		});

    axios.post("http://localhost:3001/borrarSede", {
      sedeBorrar: sede,
    });
    swal({
      icon: "success",
      title: "Sede eliminada",
      text: "La sede " + sede + " se eliminó correctamente"
    });
    return sedesMemoria.filter((sedeMemoria) => sedeMemoria.Nombre !== sede);
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
  }
  return sedesMemoria;
};

const abrirSede = (sede) => {
  window.location.href = "/sedes/" + sede.replace("/","$");
}

const abrirInstitutosSede = (sede) => {
  window.location.href = "/sedes/" + sede.replace("/","$") + "/institutos";
}

const abrirAulasSede = (sede) => {
  window.location.href = "/sedes/" + sede.replace("/","$") + "/aulas";
}

const sedesServices = { insertarSedes, borrarSede, modificarSede, abrirSede, abrirInstitutosSede, abrirAulasSede };

export default sedesServices;
