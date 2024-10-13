import EmployeeStatus from './EmployeeStatus'

export class EmployeeDto {
  id!: string
  firstname!: string
  lastname!: string
  hiredAt!: Date
  phone?: string
  address?: string
  status!: EmployeeStatus
  departmentId!: string
  pictureURL?: string
  createdAt?: Date
  updatedAt?: Date
}