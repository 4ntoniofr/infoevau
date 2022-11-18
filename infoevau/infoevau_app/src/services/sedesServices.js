import axios from "axios";

const insertarSedes = (sedes) => {
  axios.post("http://localhost:3001/nuevasSedes", {
    sedes: sedes.slice(1, sedes.length),
  });
  return sedes.slice(1, sedes.length).map((sede) => {return {Nombre: sede}});
};

const borrarSede = (sede, sedesMemoria) => {
  if(sede){
		axios.post("http://localhost:3001/borrarSede", {
    	sedeBorrar: sede,
  	});
  	return sedesMemoria.filter((sedeMemoria) => sedeMemoria.Nombre !== sede);
	}
	return sedesMemoria;
};

const modificarSede = (sede, sedesMemoria) => {
	if(sede){
		let sedeModif = prompt('Introduzca un nuevo nombre de sede', sede);
		axios.post("http://localhost:3001/modificarSede", {
			prevSede: sede,
			postSede: sedeModif
		});
		sedesMemoria.find(s => s.Nombre === sede).Nombre = sedeModif;
		console.log(sedesMemoria)
		return sedesMemoria
	}
	return sedesMemoria;
};

const sedesServices = { insertarSedes, borrarSede, modificarSede };

export default sedesServices;
