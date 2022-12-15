import axios from "axios";

const asignarSede = (instituto, sede) => {
	axios.post("http://localhost:3001/asignarSedeInstituto", {
		instituto: instituto.Nombre,
		sede: sede
	})
};

const desasignarSede = (instituto) => {
	axios.post("http://localhost:3001/desasignarSedeInstituto", {
		instituto: instituto.Nombre,
	})
};

const institutosServices = { asignarSede, desasignarSede };

export default institutosServices;