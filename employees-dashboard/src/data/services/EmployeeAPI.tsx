import { CreateEmployeeDto } from '../dto/CreateEmployeeDto'
import { EmployeeDto } from '../dto/EmployeeDto'
import { UpdateEmployeeDto } from '../dto/UpdateEmployeeDto'
import BackendService from './BackendService'

class EmployeesService extends BackendService {

  constructor() {
    super(import.meta.env.VITE_EMPLOYEES_API)
  }

  async getAll(): Promise<EmployeeDto[]> {
    return this.get<EmployeeDto[]>('')
  }

  async getById(id: string): Promise<EmployeeDto> {
    return this.get<EmployeeDto>(`/${id}`)
  }

  async createOne(input: CreateEmployeeDto): Promise<EmployeeDto> {
    return this.post<EmployeeDto>('/', input)
  }

  async updateById(id: string, input: Partial<UpdateEmployeeDto>): Promise<EmployeeDto> {
    return this.put<EmployeeDto>(`/${id}`, input)
  }

  async deleteById(id: string): Promise<void> {
    return this.delete<void>(`/${id}`)
  }
}

export default EmployeesService
