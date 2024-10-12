import { inject, injectable } from 'tsyringe'
import { GatewayRouter } from '../GatewayRouter'
import EmployeesController from '../controllers/EmployeesController'
import PostCreateEmployee from '../validators/PostCreateEmployee'
import PutUpdateEmployee from '../validators/PutUpdateEmployee'
import GetEmployeeRequest from '../validators/GetEmployeeRequest'
import DeleteEmployeeRequest from '../validators/DeleteEmployeeRequest'
import GetAllEmployeesRequest from '../validators/GetAllEmployeesRequest'

@injectable()
class EmployeeRouter extends GatewayRouter {

  constructor(
    @inject(EmployeesController) protected employeeController: EmployeesController
  ) {
    super()
    this.setup()
  }
  
  setup(): void {

    this.routes.delete(
      '/:employeeId',
      ...DeleteEmployeeRequest,
      this.employeeController.deleteEmployee.bind(this.employeeController)
    )

    this.routes.get(
      '/:employeeId',
      ...GetEmployeeRequest,
      this.employeeController.getEmployee.bind(this.employeeController)
    )
    
    this.routes.put(
      '/:employeeId',
      ...PutUpdateEmployee,
      this.employeeController.updateEmployee.bind(this.employeeController)
    )
    
    this.routes.post(
      '/',
      ...PostCreateEmployee,
      this.employeeController.createEmployee.bind(this.employeeController)
    )

    this.routes.get(
      '/',
      ...GetAllEmployeesRequest,
      this.employeeController.getAllEmployees.bind(this.employeeController)
    )
  }
  
}

export default EmployeeRouter
