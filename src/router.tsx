// src/router.tsx
import { createBrowserRouter, redirect } from "react-router"
import { auth } from "@/firebase"

import HomePage from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import DashboardPage from "@/pages/DashboardPage"
import ProfilePage from "@/pages/ProfilePage"
import App from "@/App"
import NovaFichaPage from "@/pages/NovaFichaPage"
import FichaPage from "@/pages/FichaPage"

async function protectedLoader() {
  await auth.authStateReady()
  if (!auth.currentUser) throw redirect("/login")
  return null
}

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // Rotas públicas
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },

      // Rotas protegidas
      {
        loader: protectedLoader, // bloqueia filhos se deslogado
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/ficha/nova", element: <NovaFichaPage /> },
          { path: "/ficha/:id",  element: <FichaPage /> },
          { path: "/perfil", element: <ProfilePage /> },
        ],
      },
    ],
  },
])
