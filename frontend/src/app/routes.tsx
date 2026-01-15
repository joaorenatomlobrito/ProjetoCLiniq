import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../features/home";
import { LoginPage } from "../features/auth";
import { UsersPage } from "../features/users";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/users", element: <UsersPage /> }
]);
