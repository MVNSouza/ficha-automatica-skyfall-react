import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from '@/pages/HomePage.tsx'
import LoginPage from '@/pages/LoginPage.tsx'
import RegisterPage from '@/pages/RegisterPage.tsx'
import DashboardPage from '@/pages/DashboardPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
      {
        index: true, Component: HomePage
      },
      {
        path: "/login", Component: LoginPage
      },
      {
        path: "/register", Component: RegisterPage
      },
      {
        path: "/dashboard", Component: DashboardPage
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
