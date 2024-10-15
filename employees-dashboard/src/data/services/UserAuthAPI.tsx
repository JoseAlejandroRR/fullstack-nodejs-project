import BackendService from './BackendService'
import AuthSession from '../dto/AuthSession'

class UserAuthAPI extends BackendService {

  constructor() {
    super(import.meta.env.VITE_AUTH_API)
  }

  async login(email: string, password: string): Promise<AuthSession> {
    return this.post<AuthSession>('/login', {
      email, password
    })
  }
}

export default UserAuthAPI
