import { useState  } from 'react'
import AuthSession from '../dto/AuthSession'
import UserAuthAPI from '../services/UserAuthAPI'
import useLocalStorage from './useLocalStorage'
import { AxiosError } from 'axios'

const authService = new UserAuthAPI()

const initialState: AuthSession = {
  user: undefined,
  token: undefined
}

enum AuthError {
  INVALID_CREDENTIALS,
  UNKNOWN
}

const useAuth = () => {
  const [auth, setAuth] = useLocalStorage<AuthSession>('auth', initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)

  const userLogin = async (email: string, password: string) => {
    setLoading(true)
    try {
      const data = await authService.login(email, password)
      if (data.token) {
        setAuth(data)
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status === 401) {
          setError(AuthError.INVALID_CREDENTIALS)
        }
      } else {
        setError(AuthError.INVALID_CREDENTIALS)
      }
    } finally {
      setLoading(false)
    }
  }

  const userLogout = () => {
    setAuth(initialState)
  }

  return {
    auth,
    loading,
    error,
    userLogin,
    userLogout,
  }
}

export default useAuth
