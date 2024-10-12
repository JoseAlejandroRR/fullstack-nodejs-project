import MySqlBaseRepository from './MySqlBaseRepository'
import { ServiceProviderIds } from '@/domain/ServiceProvideIds'
import MysqlDatabase from '../database/MysqlDatabase'
import { inject, injectable } from 'tsyringe'
import IDepartmentRepository from '@/domain/repositories/IDepartmentRepository'
import { Department } from '@/domain/models/Department'
@injectable()
class MySqlDepartmentRepository extends MySqlBaseRepository<Department> implements IDepartmentRepository {

  constructor(
    @inject(ServiceProviderIds.Database) protected database: MysqlDatabase,
  ) {
    super(database)
  }

  protected getEntityClass(): new () => Department {
    return Department
  }

}

export default MySqlDepartmentRepository
