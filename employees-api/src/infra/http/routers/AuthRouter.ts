import { inject, injectable } from 'tsyringe'
import { GatewayRouter } from '../GatewayRouter'
import { Context } from 'hono'
import PostLoginRequest from '../validators/PostLoginRequest'
import AuthController from '../controllers/AuthController'

@injectable()
class AuthRouter extends GatewayRouter {

  constructor(
    @inject(AuthController) protected authController: AuthController
  ) {
    super()
    this.setup()
  }
  
  setup(): void {

    this.routes.get('/', (ctx: Context) => ctx.json([]))
    
    this.routes.post(
      '/login',
      ...PostLoginRequest,
      this.authController.loginAuthentication.bind(this.authController)
    )
  }
  
}


export default AuthRouter
