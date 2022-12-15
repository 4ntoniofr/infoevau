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

const modificarSede = (prevSede, nuevaSede, sedesMemoria) => {
    if (nuevaSede != null && nuevaSede !== "" && nuevaSede.charAt(0) !== " ") {
      axios.post("http://localhost:3001/modificarSede", {
        prevSede: prevSede,
        postSede: nuevaSede,
      });
      sedesMemoria.find((s) => s.Nombre === prevSede).Nombre = nuevaSede;
      return sedesMemoria.map((sedeMemoria) => {
        if (sedeMemoria.Nombre === prevSede) {
          return { ...sedeMemoria, Nombre: nuevaSede };
        }
        return sedeMemoria;
      });  
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

const abrirPersonalSede = (sede) => {
  window.location.href = "/sedes/" + sede.replace("/", "$") + "/personal"
}

const sedesServices = { insertarSedes, borrarSede, modificarSede, abrirSede, abrirInstitutosSede, abrirAulasSede , abrirPersonalSede};

export default sedesServices;
