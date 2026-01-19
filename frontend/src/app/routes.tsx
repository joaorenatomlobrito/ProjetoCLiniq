import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../features/home";
import { LoginPage, RegisterPage } from "../features/auth";
import { UsersPage } from "../features/users";
import { ExamsPage } from "../features/exams";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/cadastro", element: <RegisterPage /> },
  { path: "/exames", element: <ExamsPage /> },
  { path: "/users", element: <UsersPage /> }
]);
