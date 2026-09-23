import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todo from "./pages/todo";
import Home from "./layout/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          index: true,
          element: <Todo />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;