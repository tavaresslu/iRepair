import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import RootLayout from './layouts/RootLayout.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import ClientsPage from './pages/ClientsPage.tsx'
import ServiceOrdersPage from './pages/ServiceOrdersPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { PrivateRoute } from './components/PrivateRoute.tsx'

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'clients', element: <ClientsPage /> },
      { path: 'service-orders', element: <ServiceOrdersPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)