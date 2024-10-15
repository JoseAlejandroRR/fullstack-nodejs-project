import EmployeeStatus from './EmployeeStatus'

export class UpdateEmployeeDto {
  id?: number
  firstname?: string
  lastname?: string
  hiredAt?: Date
  phone?: string
  address?: string
  status?: EmployeeStatus
  departmentId?: string
}
