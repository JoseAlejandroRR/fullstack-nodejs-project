import { Employee } from '@/domain/models/Employee'
import { CreateEmployeeDto } from '../dto/employees/CreateEmployee'
import { inject, injectable } from 'tsyringe'
import { ServiceProviderIds } from '@/domain/ServiceProvideIds'
import IEmployeeRepository from '@/domain/repositories/IEmployeeRepository'
import { UpdateEmployeeDto } from '../dto/employees/UpdateEmployee'
import EntityNotFoundException from '@/domain/exceptions/EntityNotFoundException'
@injectable()
class EmployeeService {

  constructor(
    @inject(ServiceProviderIds.EmployeeRepository) private employeeRepository: IEmployeeRepository
  ) {}

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findByKey(id)

    if (!employee) {
      throw new EntityNotFoundException(Employee, id)
    }

    return employee
  }

  async createEmployee(data: CreateEmployeeDto): Promise<Employee> {
    const employee = Employee.factory(data)

    return this.employeeRepository.create(employee)
  }

  async updateEmployee(id: string, data: UpdateEmployeeDto): Promise<any> {
    const employee = await this.getEmployeeById(id)

    employee.update(data)

    return await this.employeeRepository.update(employee)
  }

  async deleteEmployee(id: string): Promise<boolean> {
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
