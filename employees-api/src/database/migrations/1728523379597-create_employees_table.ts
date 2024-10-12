import { TABLE_DEPARTMENTS } from './../../domain/models/Department'
import EmployeeStatus from './../../domain/enums/EmployeeStatus'
import { TABLE_EMPLOYEES } from './../../domain/models/Employee'
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'
export class createEmployeesTable1728523379597 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(
      new Table({
        name: TABLE_EMPLOYEES,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'firstname',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'lastname',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.keys(EmployeeStatus),
          },
          {
            name: 'department_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'hired_at',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    )

    await queryRunner.createForeignKey(
      TABLE_EMPLOYEES,
      new TableForeignKey({
        columnNames: ['department_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TABLE_DEPARTMENTS,
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    const table = await queryRunner.getTable(TABLE_EMPLOYEES);
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf('department_id') !== -1)
    if (foreignKey) {
      await queryRunner.dropForeignKey(TABLE_EMPLOYEES, foreignKey)
    }

    await queryRunner.dropTable(TABLE_EMPLOYEES)
  }
}
