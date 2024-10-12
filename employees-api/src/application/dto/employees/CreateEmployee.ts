import EmployeeStatus from '@/domain/enums/EmployeeStatus'

export class CreateEmployeeDto {
  firstname!: string
  lastname!: string
  hiredAt!: Date
  phone?: string
  address?: string
  status?: EmployeeStatus
  departmentId?: string
}
