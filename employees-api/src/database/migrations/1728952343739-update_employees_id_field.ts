import { Employee, TABLE_EMPLOYEES } from './../../domain/models/Employee'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateEmployeesIdField1728952343739 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    const repository = queryRunner.manager.getRepository(Employee)

    const employees = await repository.find()

    await queryRunner.renameColumn(TABLE_EMPLOYEES, 'id', 'id_legacy')

    await queryRunner.query(`ALTER TABLE ${TABLE_EMPLOYEES} ADD COLUMN \`id\` INT NULL FIRST;`)

    let index = 1000
    for(const employee of employees) {
      await queryRunner.query(`
        UPDATE ${TABLE_EMPLOYEES} SET id = ${index} WHERE id_legacy = '${employee.id}'
      `);
      index++
    }

    await queryRunner.dropColumn(TABLE_EMPLOYEES, 'id_legacy')

    await queryRunner.query(`
      ALTER TABLE ${TABLE_EMPLOYEES} MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    `)

    if (index === 1000) {
      await queryRunner.query(`
        ALTER TABLE ${TABLE_EMPLOYEES} AUTO_INCREMENT = 1000
      `)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }

}
