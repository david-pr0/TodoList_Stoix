import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Task from "./Pages/Task";
import EditTask from "./Pages/EditTask";
import ProtectedRoute from "./Components/ProtectedRoute"; // Importa o componente de proteção

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/task/:id",
      element: (
        <ProtectedRoute>
          <Task />
        </ProtectedRoute>
      ),
    },
    {
      path: "/edittask/:id",
      element: (
        <ProtectedRoute>
          <EditTask />
        </ProtectedRoute>
      ),
    },
    {
      path: "/edittask",
      element: (
        <ProtectedRoute>
          <EditTask />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
