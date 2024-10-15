import { createBrowserRouter } from 'react-router-dom'
import EmployeesPage from './ui/pages/employees/EmployeesPage'
import ErrorPage from './ui/pages/ErrorPage'
import AdminLayout from './ui/layouts/admin-layout/AdminLayout'
import DashboardPage from './ui/pages/dashboard/DashboardPage'
import EmployeeDetailsPage from './ui/pages/employees/EmployeeDetailsPage'
import LoginPage from './ui/pages/login/LoginPage'
import ProtectedRoute from './ui/security/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:'/',
        element: <ProtectedRoute />,
        children:  [
          {
            path:'/',
            element: <DashboardPage />
          },
          {
            path:'/employees',
            element: <EmployeesPage />
          },
          {
            path:'/employees/:employeeId',
            element: <EmployeeDetailsPage />
          },
        ],
      },
    ],
  },
  {
    path:'/login',
    element: <LoginPage />
  },
])
