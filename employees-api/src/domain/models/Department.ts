import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export const TABLE_DEPARTMENTS = 'departments'
@Entity(TABLE_DEPARTMENTS)
export class Department extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar' })
  name!: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date

}
