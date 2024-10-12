import { inject, injectable } from 'tsyringe'
import BaseManager from './BaseManager'
import { Department } from '@/domain/models/Department'
import DepartmentService from '../services/DepartmentService'
@injectable()
class DepartmentManager extends BaseManager {

  constructor(
    @inject(DepartmentService) private departmentService: DepartmentService
  ) {
    super()
  }

  async getAllDepartments(): Promise<Department[]> {
    const departments = await this.departmentService.getAllDepartments()

    return departments
  }
}

export default DepartmentManager
