import Login from "./auth/Login";
import Register from "./auth/Register";
import HeroSection from "./components/MainLayout/HeroSection";
import Profile from "./components/MainLayout/Profile";
import StoreRequest from "./admin/StoreRequest";
import Main from "./pages/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Routes using react-router-dom
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
        <Main />
    ),
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/admin/store-request",
        element: <StoreRequest />
      },
    ],
  },
  {
    path: "/login",
    element: (
        <Login />
    ),
  },
  {
    path: "/register",
    element: (
        <Register />
    ),
  }
]);

const App = () => {

  return (
    <div className="w-full h-screen">
      <RouterProvider router={appRouter}></RouterProvider> {/*Router Provider */}
    </div>
  )
}

export default App