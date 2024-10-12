import { User } from '../models/User'
export interface AuthenticationResult {
  user: User | null,
  token: string | null
}
export interface UserCredentials {
  email: string,
  password: string
}
export interface AuthSession {
  user: User
}
