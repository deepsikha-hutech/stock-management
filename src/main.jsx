import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import Dashboard from "./components/customer-management/Dashboard.jsx";

import CustomerManagement from "./components/customer-management/CustomerManagement.jsx";
import PortfolioManagement from "./components/customer-management/PortfolioManagement.jsx";
import FilterManagement from "./components/customer-management/FilterManagement.jsx";
import StockOutlisting from "./components/customer-management/StockOutlisting.jsx";
import ThematicInvestment from "./components/customer-management/ThematicInvestment.jsx";

// import SideBar from "./components/customer-management/SideBar.jsx";

import "./index.css";
import Error from "./components/Error.jsx";
import MasterLayout from "./components/customer-management/MasterLayout.jsx";

// import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <Error />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <Error />,
  },
  {
    path: "/",
    element: <MasterLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <Error />,
      },
      {
        path: "customer-management",
        element: <CustomerManagement />,
        errorElement: <Error />,
      },
      {
        path: "portfolio-management",
        element: <PortfolioManagement />,
        errorElement: <Error />,
      },
      {
        path: "filter-management",
        element: <FilterManagement />,
        errorElement: <Error />,
      },

      {
        path: "stock-outlisting",
        element: <StockOutlisting />,
        errorElement: <Error />,
      },
      {
        path: "thematic-investment",
        element: <ThematicInvestment />,
        errorElement: <Error />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);
