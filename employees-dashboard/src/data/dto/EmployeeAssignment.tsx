import { DepartmentDto } from './DepartmentDto'
import { EmployeeDto } from './EmployeeDto'

export class EmployeeAssignmentDto {
  id!: string
  employeeId!: number
  employee?: EmployeeDto
  departmentId!: string
  department?: DepartmentDto
  startDate!: Date
  endDate?: Date
  isActive!: boolean
  createdAt?: Date
  updatedAt?: Date
}