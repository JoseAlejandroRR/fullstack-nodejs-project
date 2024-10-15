import { isAuthActive } from '../../data/utils';
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../data/hooks/useAuth'

const ProtectedRoute = () => {
  const { auth } = useAuth()

  if (isAuthActive() && !auth.token) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default ProtectedRoute
