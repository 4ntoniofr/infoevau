import axios from "axios";

const insertarSedes = (sedes) => {
  axios.post("http://localhost:3001/nuevasSedes", {
    sedes: sedes.slice(1, sedes.length),
  });
  return sedes.slice(1, sedes.length).map(sede => sede.Nombre);
};

const borrarSede = (sede, sedesMemoria) => {
  axios.post("http://localhost:3001/sedes", {
    sedeBorrar: sede,
  });
  return sedesMemoria.filter((sedeMemoria) => sedeMemoria.Nombre !== sede);
};

const sedesServices = { insertarSedes, borrarSede };

export default sedesServices;
