import { DepartmentDto } from '../dto/DepartmentDto'
import BackendService from './BackendService'

class DeparmentsService extends BackendService {

  constructor() {
    super(import.meta.env.VITE_DEPARTMENTS_API)
  }

  async getAll(): Promise<DepartmentDto[]> {
    return this.get<DepartmentDto[]>('')
  }
}

export default DeparmentsService
