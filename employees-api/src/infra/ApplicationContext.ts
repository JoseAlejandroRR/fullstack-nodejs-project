import { container } from 'tsyringe'
import IDatabase from '@/domain/database/IDatabase'
import { ServiceProviderIds } from '@/domain/ServiceProvideIds'
import MysqlDatabase from './database/MysqlDatabase'
import MysqlUserRepository from './repositories/MysqlUserRepository'
import MySqlEmployeeRepository from './repositories/MySqlEmployeeRepository'
import MySqlDepartmentRepository from './repositories/MySqlDepartmentRepository'
import { IEventBus } from '@/domain/IEventBus'
import { LocalEventBus } from './providers/LocalEventBus'
import { EmployeeEventHandler } from '@/application/events/EmployeeEventHandler'
import MysqlEmployeeAssignmentRepository from './repositories/MysqlEmployeeAssignmentRepository'

class ApplicationContext {
  static initialize(): void {
    console.log('::STARTING SERVICE CONTAINER::')

    container.registerSingleton<IDatabase>(ServiceProviderIds.Database, MysqlDatabase)
    container.registerSingleton<IEventBus>(ServiceProviderIds.EventBus, LocalEventBus)

  
    //REPOSITORIES
    container.register(ServiceProviderIds.UserRepository, { useClass: MysqlUserRepository });
    container.register(ServiceProviderIds.EmployeeRepository, { useClass: MySqlEmployeeRepository });
    container.register(ServiceProviderIds.DepartmentRepository, { useClass: MySqlDepartmentRepository });
    container.register(ServiceProviderIds.EmployeeAssignmentRepository, { useClass: MysqlEmployeeAssignmentRepository });

    this.registerEvents()
  }

  private static registerEvents(): void {
    const events = [
      EmployeeEventHandler,
    ]

    events.forEach((handler) => {
      container.resolve(handler)
    })
  }
}

export default ApplicationContext
