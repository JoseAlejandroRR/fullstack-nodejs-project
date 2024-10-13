import EmployeeStatus from './EmployeeStatus'

export class UpdateEmployeeDto {
  id?: string
  firstname?: string
  lastname?: string
  hiredAt?: Date
  phone?: string
  address?: string
  status?: EmployeeStatus
  departmentId?: string
}
