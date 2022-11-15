import './assets/css/App.css';
import Home from './Home';
import Alumnos from './Alumnos';
import Sedes from './Sedes';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from './Navbar';

const router = createBrowserRouter([
	{
	  	path: "/",
	  	element: <Home />,
	  	errorElement: <div>Error Page</div>,
	},
	{
	  	path: "/alumnos",
			element: <Alumnos />,
			errorElement: <div>Error Page</div>,
	},
	{
			path: "/sedes",
			element: <Sedes />,
			errorElement: <div>Error Page</div>,
	}
]);

function App() {
  return (
    <div className="App">
			<body>
				<Navbar />
				<RouterProvider router={router} />
			</body>
    </div>
  );
}

export default App;
