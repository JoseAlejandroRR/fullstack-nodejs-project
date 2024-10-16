import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Employee } from './Employee'
import { Department } from './Department'

export const TABLE_ASSIGNMENTS = 'employeee_assignments'

@Entity(TABLE_ASSIGNMENTS)
export class EmployeeAssignment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'employee_id', type: 'int'})
  employeeId!: number

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee

  @Column({ name: 'department_id', type: 'varchar' })
  departmentId!: string

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department!: Department

  @Column({ name:'start_date', type: 'datetime'})
  startDate!: Date

  @Column({ name:'end_date', type: 'datetime', nullable: true })
  endDate?: Date

  @Column({ name:'active', type: 'boolean', default: false })
  isActive!: boolean

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date
}
