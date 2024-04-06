import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddNew from "../pages/Bikes/AddNew";
import Bikes from "../pages/Bikes/Bikes";
import CreateVarient from "../pages/Bikes/CreateVarient";
import EditBike from "../pages/Bikes/EditBike";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import Sales from "../pages/Sales/Sales";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Bikes /> },
      // { path: "dashboard", element: <Dashboard /> },
      {
        path: "bikes",
        children: [
          { index: true, element: <Bikes /> },
          { path: "add-new", element: <AddNew /> },
          { path: "edit/:id", element: <EditBike /> },
          { path: "create-varient/:id", element: <CreateVarient /> },
        ],
      },
      { path: "sales", element: <Sales /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
