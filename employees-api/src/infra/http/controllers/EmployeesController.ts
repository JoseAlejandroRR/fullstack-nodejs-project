import EmployeeManager from '@/application/managers/EmployeeManager'
import { BaseController } from './BaseController'
import { inject, injectable } from 'tsyringe'
import { Context } from 'hono'
import { CreateEmployeeDto } from '@/application/dto/employees/CreateEmployee'
import ViewModel from '@/domain/views/ViewModel'
import EmployeeViewModel from '@/domain/views/employees/EmployeeViewModel'
import { UpdateEmployeeDto } from '@/application/dto/employees/UpdateEmployee'
@injectable()
class EmployeesController extends BaseController {

  constructor(
    @inject(EmployeeManager) private employeeManager: EmployeeManager
  ) {
    super()
  }

  async createEmployee(ctx: Context) {
    const data: CreateEmployeeDto = await ctx.req.json()

    const employee = await this.employeeManager.createEmployee(data)

    return ctx.json(ViewModel.createOne(EmployeeViewModel, employee))
  }

  async updateEmployee(ctx: Context) {
    const { employeeId } = ctx.req.param()
    const data: UpdateEmployeeDto = await ctx.req.json()

    const employee = await this.employeeManager.updateEmployee(employeeId, data)

    return ctx.json(ViewModel.createOne(EmployeeViewModel, employee))
  }

  async getEmployee(ctx: Context) {
    const { employeeId } = ctx.req.param()

    const employee = await this.employeeManager.getEmployeeById(employeeId)

    return ctx.json(ViewModel.createOne(EmployeeViewModel, employee))
  }

  async getAllEmployees(ctx: Context) {

    const employees = await this.employeeManager.getAllEmployees()

    return ctx.json(ViewModel.createMany(EmployeeViewModel, employees))
  }

  async deleteEmployee(ctx: Context) {
    const { employeeId } = ctx.req.param()

    const employee = await this.employeeManager.deleteEmployee(employeeId)

    return ctx.text('', employee ? 200 : 500)
  }

}

export default EmployeesController
