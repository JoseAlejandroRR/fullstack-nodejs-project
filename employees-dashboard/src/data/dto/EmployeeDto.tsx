import { DepartmentDto } from './DepartmentDto'
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
  department?: DepartmentDto
  pictureURL?: string
  createdAt?: Date
  updatedAt?: Date
}