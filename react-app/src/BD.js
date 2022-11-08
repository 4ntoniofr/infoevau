import Axios from 'axios';

let message = 'LOG DE INSERCIONES';

export function selectDB() {
	return Axios.get('http://localhost:3001/query');
}

export function insertDB(cont){
	Axios.post('http://localhost:3001/add',{
		cont: cont
	}).then((res) => {
		console.log(res);
		message = message + '\n' + res.data.code + ' al introducir los datos: ' + cont;
	});
}

export function updateDB(){
	console.log('Hola');
}

export function deleteDB(c1){
	Axios.post('http://localhost:3001/delete',{
		id: c1
	}).then((res) => {
		//if(res == 0) console.log('Insercion realizada con exito');
		console.log(res);
	});
}

export function WriteFile() {
	const blob = new Blob([message], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.download = "info.txt";
	link.href = url;
	link.click();
  }