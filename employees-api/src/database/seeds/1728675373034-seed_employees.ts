import { Employee } from './../../domain/models/Employee'
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
export class SeedEmployees1728675373034 implements Seeder {
  track = false

  public async run(
      dataSource: DataSource,
      factoryManager: SeederFactoryManager
  ): Promise<any> {
    console.log('::SEED_EMPLOYEES::')
    const repository =  dataSource.getRepository(Employee)
    const hasRecords = await repository.find()
    console.log(hasRecords.length)

    if (hasRecords.length > 0) return

    const employeeFactory = factoryManager.get(Employee)

    await employeeFactory.saveMany(20)
  }
}
