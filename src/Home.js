import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CSVReader from './CSVReader';

const Home = () => {
	let navigate = useNavigate();

	return(
	<div>
		<h3>Home</h3>
		<Link to={'/about'}>About</Link>
		<button onClick={()=>{navigate("/about")}}>About page</button>
		<br></br>
		<br></br>
		<br></br>
		<CSVReader />
	</div>
	)
}

export default Home