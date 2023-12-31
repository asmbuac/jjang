import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import Orders from "./pages/orders/Orders";
import { useAppSelector } from "./hooks";
import Artists from "./pages/artists/Artists";

export default function App() {
  const user = useAppSelector((state) => state.auth.currentUser);

  const Layout = () => {
    return (
      <div className="main">
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Navbar />
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Layout /> : <Navigate replace to="/login" />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "artists",
          element: <Artists />,
        },
        {
          path: "users/:id",
          element: <User />,
        },
        {
          path: "products/:id",
          element: <Product />,
        },
      ],
    },
    {
      path: "login",
      element: user ? <Navigate replace to="/" /> : <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}
