import "./assets/css/App.css";
import Home from "./components/Home";
import Alumnos from "./components/Alumnos";
import Sedes from "./components/Sedes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import InstitutosSede from "./components/InstitutosSede";
import ResponsablesSede from './components/ResponsablesSede';
import AulasSede from "./components/AulasSede";
import PaginaError from "./components/PaginaError"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PaginaError />,
  },
  {
    path: "/alumnos",
    element: <Alumnos />,
    errorElement: <PaginaError />,
  },
  {
    path: "/sedes",
    element: <Sedes />,
    errorElement: <PaginaError />,
  },
  {
    path: "/sedes/:idSede/institutos",
    element: <InstitutosSede />,
    errorElement: <PaginaError />,
  },
  {
    path: "/sedes/:idSede/responsables",
    element: <ResponsablesSede />,
    errorElement: <PaginaError />,
  },
  {
    path: "sedes/:idSede/aulas",
    element: <AulasSede />,
    errorElement: <PaginaError />,
  }
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
