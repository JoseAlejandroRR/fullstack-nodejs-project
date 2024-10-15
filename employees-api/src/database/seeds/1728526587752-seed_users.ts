import { DataSource } from 'typeorm'
import UserRole from './../../domain/enums/UserRole'
import { User } from './../../domain/models/User'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
export class SeedUsers1728526587752 implements Seeder {
  track = false

  public async run(
      dataSource: DataSource,
      factoryManager: SeederFactoryManager
  ): Promise<any> {
    console.log('::USER_SEED_STARTED::')
    const repository =  dataSource.getRepository(User);
    const hasRecords = await repository.find()

    if (hasRecords.length > 0) return        

    const manager = User.create({
        firstname: 'Jose',
        lastname: 'Realza',
        role: UserRole.ADMIN,
        email: 'josealejandror28@gmail.com',
        password: '123456',
    })
    await repository.save(manager)
    
    const userFactory = await factoryManager.get(User)

    await userFactory.saveMany(5)
    console.log('::USER_SEED_END::')
  }
}
