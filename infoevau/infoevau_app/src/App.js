import "./assets/css/App.css";
import Home from "./components/Home";
import Alumnos from "./components/Alumnos/Alumnos";
import Materias from "./components/Materias/Materias";
import Sedes from "./components/Sedes/Sedes";
import GestionSede from "./components/Sedes/GestionSede";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import InstitutosSede from "./components/Institutos/InstitutosSede";
import ResponsablesSede from './components/Responsables/ResponsablesSede';
import AulasSede from "./components/Aulas/AulasSede";
import PaginaError from "./components/PaginaError"
import PersonalSede from "./components/Personal/PersonalSede";

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
    path: "/examenes",
    element: <Materias />,
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
    path: "/sedes/responsablesSede",
    element: <ResponsablesSede />,
    errorElement: <PaginaError />,
  },
  {
    path: "sedes/:idSede/aulas",
    element: <AulasSede />,
    errorElement: <PaginaError />,
  },
  {
    path:"sedes/:idSede",
    element: <GestionSede />,
    errorElement: <PaginaError />,
  },
  {
    path:"sedes/:idSede/personal",
    element: <PersonalSede />,
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
