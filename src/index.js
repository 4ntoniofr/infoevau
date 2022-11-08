import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import About from './About';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//const Home = lazy(() => import('./Home'));
//const About = lazy(() => import('./About'));
  
  const router = createBrowserRouter([
	{
	  path: "/",
	  element: <Home />,
	  errorElement: <div>Error Page</div>,
	},
	{
		path: "/about",
		element: <About />
	}
  ]);
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
