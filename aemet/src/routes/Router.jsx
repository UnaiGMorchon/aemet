import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Prediction from "../components/Prediction";
import Beaches from "../components/Beaches";
import App from "../App";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404 not found</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
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
    ],
  },
]);

export default Router;
