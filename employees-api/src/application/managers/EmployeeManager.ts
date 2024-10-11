import { Employee } from '@/domain/models/Employee';
import BaseManager from './BaseManager';
import { CreateEmployeeDto } from '../dto/employees/CreateEmployee';
import { inject, injectable } from 'tsyringe';
import EmployeeService from '../services/EmployeeService';
import { UpdateEmployeeDto } from '../dto/employees/UpdateEmployee';
import EmployeeStatus from '@/domain/enums/EmployeeStatus';
import { ServiceProviderIds } from '@/domain/ServiceProvideIds';
import IDatabase from '@/domain/database/IDatabase';

@injectable()
class EmployeeManager extends BaseManager {

  constructor(
    @inject(ServiceProviderIds.Database) private database: IDatabase, 
    @inject(EmployeeService) private employeeService: EmployeeService,
  ) {
    super()
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.employeeService.getEmployeeById(id)

    return employee
  }

  async createEmployee(data: CreateEmployeeDto): Promise<Employee> {
    data.status = EmployeeStatus.ACTIVE

    try {
      await this.database.startTransaction()

      const employee = await this.employeeService.createEmployee(data)

      await this.database.commit()

      return employee
    } catch (err) {
      await this.database.rollback()
      throw err
    } finally {
      await this.database.release()
    }
  }

  async updateEmployee(id: string, data: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeService.updateEmployee(id, data)

    return employee
  }

  async getAllEmployees(): Promise<Employee[]> {
    const employees = await this.employeeService.getAllEmployees()

    return employees
  }

  async deleteEmployee(id: string): Promise<boolean> {
    const isDelete = await this.employeeService.deleteEmployee(id)

    return isDelete
  }
}

export default EmployeeManager