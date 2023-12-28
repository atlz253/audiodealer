import React, { useContext } from "react";
import { Route, RouterProvider, Routes, createHashRouter } from "react-router-dom";
import { admin_routes, dealer_routes } from "../configs/routes";
import App from "./App";
import { AuthContext } from "../context";
import AuthPage from "./AuthPage";

export const AppRouter = () => {
  const { auth } = useContext(AuthContext);

  if (auth === null) {
    // Пользователь не авторизован
    return <AuthPage />;
  }

  let routes = createHashRouter(dealer_routes);

  if (auth.type === "admin") {
    routes = createHashRouter(admin_routes);
  }

  return (
    <RouterProvider router={routes} />
  );
};
