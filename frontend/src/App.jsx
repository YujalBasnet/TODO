import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todo from "./pages/todo";

const App  = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Todo/>,
    },
  ]);
  return (
   <RouterProvider router={router} />
  );
};

export default App;