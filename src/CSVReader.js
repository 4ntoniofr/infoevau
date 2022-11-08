import React, { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import { insertDB, selectDB, deleteDB, WriteFile } from './BD';

export default function CSVReader() {
  const { CSVReader } = useCSVReader();
  const [contenido, setContenido] = useState([]);
  const [resultado,setResultado] = useState([]);
  const [elemDelete,seteElemDelete] = useState('');
  const [message, setMessage] = useState('');




  return (
    <CSVReader
      onUploadAccepted={(results) => {
        console.log('---------------------------');
        console.log(results);
		setContenido(results.data);
        console.log('---------------------------');
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }) => (
        <>
        <div>
            <button type='button' {...getRootProps()}>
              Browse file
            </button>
            <div>
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()}>
              Remove
            </button>
			<button onClick={() => {
					contenido.forEach(row => insertDB(row));
				}}>
				Send
			</button>
			<button onClick={() => {
				selectDB().then((r) => {
					setResultado(r.data);
					console.log(resultado);
				})}}>
				Select
			</button>
			<input type="text" onChange={(e) => {seteElemDelete(e.target.value)}} placeholder='Delete elem'></input>
			<button onClick={() => {deleteDB(elemDelete)}}>
				Delete
			</button>
			<button onClick={() => {WriteFile()}}>
				Create File
			</button>
        </div>
		{contenido.map((value,key) => {
			return <div>
				<p>{value[0]} {value[1]} {value[2]} {value[3]} </p>
			</div>
		})}
		<br />
		{resultado.map((value,key) => {
			return <div>
				<p>{value.c1} {value.c2} {value.c3} {value.c4} </p>
			</div>
		 })}
        <ProgressBar />
        </>
      )}
    </CSVReader>
  );
}