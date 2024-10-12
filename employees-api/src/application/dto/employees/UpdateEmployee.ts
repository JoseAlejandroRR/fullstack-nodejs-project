import EmployeeStatus from '@/domain/enums/EmployeeStatus'

export class UpdateEmployeeDto {
  firstname?: string
  lastname?: string
  hiredAt?: Date
  phone?: string
  address?: string
  status?: EmployeeStatus
  departmentId?: string
}
