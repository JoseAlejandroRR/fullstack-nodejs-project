
import MySqlBaseRepository from './MySqlBaseRepository'
import { ServiceProviderIds } from '@/domain/ServiceProvideIds'
import MysqlDatabase from '../database/MysqlDatabase'
import { inject, injectable } from 'tsyringe'
import { EmployeeAssignment } from '@/domain/models/EmployeeAssignment'
import IEmployeeAssignmentRepository from '@/domain/repositories/IEmployeeAssignmentRepository'

@injectable()
class MysqlEmployeeAssignmentRepository extends MySqlBaseRepository<EmployeeAssignment>
  implements IEmployeeAssignmentRepository {

  constructor(
    @inject(ServiceProviderIds.Database) protected database: MysqlDatabase,
  ) {
    super(database)
  }

  protected getEntityClass(): new () => EmployeeAssignment {
    return EmployeeAssignment
  }

}

export default MysqlEmployeeAssignmentRepository
