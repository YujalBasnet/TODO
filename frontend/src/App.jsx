
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./layout/Home";
import Landing from "./pages/Landing";
import Todo from "./pages/todo";
import Login from "./components/form/Login";
import Register from "./components/form/Register";



const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      children: [
        {
          index: true,
          element: <Landing/>,
        },
        {
          path: "todo",
          element: (
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <Login/>
        },
        {
          path: "register",
          element: <Register/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;