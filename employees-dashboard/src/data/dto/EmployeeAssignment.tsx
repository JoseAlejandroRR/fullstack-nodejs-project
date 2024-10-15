import { DepartmentDto } from './DepartmentDto'
import { EmployeeDto } from './EmployeeDto'

export class EmployeeAssignmentDto {
  id!: number
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