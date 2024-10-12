import { User } from '@/domain/models/User'
import MySqlBaseRepository from './MySqlBaseRepository'
import { inject, injectable } from 'tsyringe'
import MysqlDatabase from '../database/MysqlDatabase'
import { ServiceProviderIds } from '@/domain/ServiceProvideIds'
import { IUserRepository } from '@/domain/repositories/IUserRepository'
@injectable()
class MysqlUserRepository extends MySqlBaseRepository<User> implements IUserRepository {

  constructor(
    @inject(ServiceProviderIds.Database) protected database: MysqlDatabase,
  ) {
    super(database)
  }

  protected getEntityClass(): new () => User {
    return User
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email }})
  }
  
}

export default MysqlUserRepository
