import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Prediction from "../components/Prediction";
import Beaches from "../components/Beaches";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>404 not found</h1>,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/prediction",
    element: <Prediction />,
    children: [
      {
        path: ":id",
        element: <Prediction />,
      },
    ],
  },
  /*  // esto seria igual lo q pasa q la de arriba de children es mas orndenada pero sirve igual
  {
    path: "/prediction/:id",
    element: <Prediction />,
  }, */
  {
    path: "/beach",
    element: <Beaches />,
    children: [
      {
        path: ":id",
        element: <Beaches />,
      },
    ],
  },
]);

export default Router;
