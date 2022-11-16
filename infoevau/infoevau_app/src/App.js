import "./assets/css/App.css";
import Home from "./components/Home";
import Alumnos from "./components/Alumnos";
import Sedes from "./components/Sedes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";

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
    errorElement: <div>Error page</div>,
  },
]);

function App() {
  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
