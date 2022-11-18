import axios from "axios";

const insertarSedes = (sedes, setSedesMemoria) => {
  axios.post("http://localhost:3001/nuevasSedes", {
    sedes: sedes.slice(1, sedes.length),
  });
  setSedesMemoria(sedes.slice(1, sedes.length));
};

const borrarSede = (sede, sedesMemoria) => {
  axios.post("http://localhost:3001/sedes", {
    sedeBorrar: sede,
  });
  return sedesMemoria.filter((sedeMemoria) => sedeMemoria.Nombre !== sede);
};

const sedesServices = { insertarSedes, borrarSede };

export default sedesServices;
