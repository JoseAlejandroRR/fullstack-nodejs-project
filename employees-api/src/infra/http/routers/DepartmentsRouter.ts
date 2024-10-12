import { GatewayRouter } from '../GatewayRouter'
import { inject, injectable } from 'tsyringe'
import DepartmentsController from '../controllers/DepartmentsController'
@injectable()
class DepartmentsRouter extends GatewayRouter {

  constructor(
    @inject(DepartmentsController) protected departmentsController: DepartmentsController
  ) {
    super()
    this.setup()
  }
  
  setup(): void {

    this.routes.get(
      '/',
      this.departmentsController.getAllDepartments.bind(this.departmentsController)
    )
  }
  
}

export default DepartmentsRouter
