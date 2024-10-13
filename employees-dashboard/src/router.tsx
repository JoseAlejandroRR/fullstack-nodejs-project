import { createBrowserRouter } from 'react-router-dom'
import EmployeesPage from './ui/pages/employees/EmployeesPage'
import ErrorPage from './ui/pages/ErrorPage'
import AdminLayout from './ui/layouts/admin-layout/AdminLayout'
import DashboardPage from './ui/pages/dashboard/DashboardPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:'/',
        element: <DashboardPage />
      },
      {
        path:'/employees',
        element: <EmployeesPage />
      }
    ]
  },
])
