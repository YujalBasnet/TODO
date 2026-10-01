
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./layout/Home";
import Landing from "./pages/Landing";
import Todo from "./pages/todo";
import Login from "./components/form/Login";
import Register from "./components/form/Register";
import About from "./pages/About";



const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("appUser");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};


const PublicRoute = ({ children}) => {
  const user = localStorage.getItem("appUser");

  if (user){
    return <Navigate to="/todo" replace />;
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
          element: ( 
          <PublicRoute>
            <Landing />
          </PublicRoute>),
        },
        {
          path: "about",
          element: (
          <PublicRoute>
            <About />
          </PublicRoute>),
        },
        {
          path: "todo",
          element:(
          < ProtectedRoute>
            <Todo />
          </ProtectedRoute>),
        },
        {
          path: "login",
          element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
          ),
        },
        {
          path: "register",
          element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
          )
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;