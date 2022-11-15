import './App.css';
import Home from './Home';
import Alumnos from './Alumnos';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
	}
]);

function App() {
  return (
    <div className="App">
		<RouterProvider router={router} />
    </div>
  );
}

export default App;
