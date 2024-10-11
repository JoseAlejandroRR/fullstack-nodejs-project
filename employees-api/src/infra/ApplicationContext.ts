import { container } from 'tsyringe'
import IDatabase from '@/domain/database/IDatabase'
import { ServiceProviderIds } from '@/domain/ServiceProvideIds'
import MysqlDatabase from './database/MysqlDatabase'
import MysqlUserRepository from './repositories/MysqlUserRepository'
import MySqlEmployeeRepository from './repositories/MySqlEmployeeRepository'
import MySqlDepartmentRepository from './repositories/MySqlDepartmentRepository'

class ApplicationContext {
  static initialize(): void {
    console.log('::STARTING SERVICE CONTAINER::')

    container.registerSingleton<IDatabase>(ServiceProviderIds.Database, MysqlDatabase)
  
    //REPOSITORIES
    container.register(ServiceProviderIds.UserRepository, { useClass: MysqlUserRepository });
    container.register(ServiceProviderIds.EmployeeRepository, { useClass: MySqlEmployeeRepository });
    container.register(ServiceProviderIds.DepartmentRepository, { useClass: MySqlDepartmentRepository });

  }
}

export default ApplicationContext