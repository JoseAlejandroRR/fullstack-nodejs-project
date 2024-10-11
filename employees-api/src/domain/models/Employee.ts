import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'; 
import { Department } from './Department';
import { CreateEmployeeDto } from '@/application/dto/employees/CreateEmployee';
import { UpdateEmployeeDto } from '@/application/dto/employees/UpdateEmployee';
import EmployeeStatus from '../enums/EmployeeStatus';

export const TABLE_EMPLOYEES = 'employees'

@Entity(TABLE_EMPLOYEES)
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: 'varchar' })
  firstname!: string;

  @Column({ type: 'varchar' })
  lastname!: string;

  @Column({ name:'hired_at', type: 'datetime'})
  hiredAt!: Date

  @Column({ type: 'varchar' })
  phone?: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string

  @Column({ type: 'enum', enum: EmployeeStatus })
  status!: EmployeeStatus

  @Column({ name: 'department_id', type: 'string', nullable: true })
  departmentId?: string

  @ManyToOne(() => Department, { nullable: true, onDelete: 'CASCADE'  })
  @JoinColumn({ name: 'department_id' })
  department?: Department;
  
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;

  static factory(createEmployeeDto: CreateEmployeeDto): Employee {
    const employee = new Employee();
    employee.firstname = createEmployeeDto.firstname;
    employee.lastname = createEmployeeDto.lastname;
    employee.hiredAt = createEmployeeDto.hiredAt;
    employee.phone = createEmployeeDto.phone;
    employee.address = createEmployeeDto.address;
    employee.departmentId = createEmployeeDto.departmentId;

    return employee;
  }

  update(updateEmployeeDto: UpdateEmployeeDto): void {

    if (updateEmployeeDto.firstname !== undefined) {
      this.firstname = updateEmployeeDto.firstname;
    }

    if (updateEmployeeDto.lastname !== undefined) {
      this.lastname = updateEmployeeDto.lastname;
    }

    if (updateEmployeeDto.hiredAt !== undefined) {
      this.hiredAt = updateEmployeeDto.hiredAt;
    }

    if (updateEmployeeDto.phone !== undefined) {
      this.phone = updateEmployeeDto.phone;
    }

    if (updateEmployeeDto.address !== undefined) {
      this.address = updateEmployeeDto.address;
    }

    if (updateEmployeeDto.status !== undefined) {
      this.status = updateEmployeeDto.status;
    }

    if (updateEmployeeDto.departmentId !== undefined) {
      this.departmentId = updateEmployeeDto.departmentId;
    }
  }

}
