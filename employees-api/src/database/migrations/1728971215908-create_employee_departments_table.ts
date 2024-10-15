import { TABLE_DEPARTMENTS } from './../../domain/models/Department'
import { TABLE_EMPLOYEES } from './../../domain/models/Employee'
import { TABLE_ASSIGNMENTS } from './../../domain/models/EmployeeAssignment'
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateEmployeeDepartmentsTable1728971215908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: TABLE_ASSIGNMENTS,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'employee_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'department_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'start_date',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'end_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }))

      await queryRunner.createForeignKey(
        TABLE_ASSIGNMENTS,
        new TableForeignKey({
          columnNames: ['department_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TABLE_DEPARTMENTS,
          onDelete: 'CASCADE',
        })
      )
      await queryRunner.createForeignKey(
        TABLE_ASSIGNMENTS,
        new TableForeignKey({
          columnNames: ['employee_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TABLE_EMPLOYEES,
          onDelete: 'CASCADE',
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(TABLE_ASSIGNMENTS)
    }

}
