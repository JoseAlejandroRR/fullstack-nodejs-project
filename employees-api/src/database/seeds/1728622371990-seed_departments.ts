import { Department } from './../../domain/models/Department';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export const DEPARTMENTS_DATA_FAKE = [
  {
    id: '67c3f732-9e04-4b71-9caa-05dc9c0b3062',
    name: 'Resourcing Management',
  },
  {
    id: '768e58f2-ed2e-4274-9c66-e493400bfec6',
    name: 'Development & Technology',
  },
  {
    id: '7a3b6d93-df18-4af0-a999-4d873146bf16',
    name: 'Quality Assurance',
  },
  {
    id: 'd28a8c00-4eb7-44f9-921a-15da373f00c9',
    name: 'Administration',
  },
]

export class SeedDepartments1728622371990 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository =  dataSource.getRepository(Department);

    const hasRecords = await repository.find()

    if (hasRecords.length > 0) return

    await repository.insert(DEPARTMENTS_DATA_FAKE)
  }
}
