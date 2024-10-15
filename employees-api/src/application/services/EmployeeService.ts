import { Employee } from '@/domain/models/Employee'
import { CreateEmployeeDto } from '../dto/employees/CreateEmployee'
import { inject, injectable } from 'tsyringe'
import { ServiceProviderIds } from '@/domain/ServiceProvideIds'
import IEmployeeRepository from '@/domain/repositories/IEmployeeRepository'
import { UpdateEmployeeDto } from '../dto/employees/UpdateEmployee'
import EntityNotFoundException from '@/domain/exceptions/EntityNotFoundException'
import { IEventBus } from '@/domain/IEventBus'
import { EventType } from '@/domain/EventType'
@injectable()
class EmployeeService {

  constructor(
    @inject(ServiceProviderIds.EmployeeRepository) private employeeRepository: IEmployeeRepository,
    @inject(ServiceProviderIds.EventBus) private eventBus: IEventBus
  ) {}

  async getEmployeeById(id: number, withRelations: boolean = false): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: {
        id
      },
      relations: withRelations ? {
        department: true
      } : {}
    })

    if (!employee) {
      throw new EntityNotFoundException(Employee, String(id))
    }

    return employee
  }

  async createEmployee(data: CreateEmployeeDto): Promise<Employee> {
    const employee = Employee.factory(data)

    return this.employeeRepository.create(employee)
  }

  async updateEmployee(id: number, data: UpdateEmployeeDto): Promise<any> {
    let employee = await this.getEmployeeById(id)
    const beforeState = Object.assign({}, employee)

    employee.update(data)

    employee = await this.employeeRepository.update(employee)

    this.eventBus.publish({
      name: EventType.Employee.Updated,
      payload: { current: employee, beforeState },
      timestamp: new Date()
    })

    return employee
  }

  async deleteEmployee(id: number): Promise<boolean> {
    const employee = await this.getEmployeeById(id)

    return await this.employeeRepository.delete(employee)
  }

  async getAllEmployees(): Promise<Employee[]> {
    const employees = await this.employeeRepository.find({
      order: {
        firstname: 'ASC',
        lastname: 'ASC',
      }
    })

    return employees
  }
}

export default EmployeeService
