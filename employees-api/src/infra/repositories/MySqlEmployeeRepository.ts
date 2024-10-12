import IEmployeeRepository from '@/domain/repositories/IEmployeeRepository'
import MySqlBaseRepository from './MySqlBaseRepository'
import { Employee } from '@/domain/models/Employee';
import { ServiceProviderIds } from '@/domain/ServiceProvideIds'
import MysqlDatabase from '../database/MysqlDatabase'
import { inject, injectable } from 'tsyringe'
@injectable()
class MySqlEmployeeRepository extends MySqlBaseRepository<Employee> implements IEmployeeRepository {

  constructor(
    @inject(ServiceProviderIds.Database) protected database: MysqlDatabase
  ) {
    super(database)
  }

  protected getEntityClass(): new () => Employee {
    return Employee
  }

}

export default MySqlEmployeeRepository
