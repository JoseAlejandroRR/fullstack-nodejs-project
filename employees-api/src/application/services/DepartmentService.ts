import { Department } from "@/domain/models/Department";
import IDepartmentRepository from "@/domain/repositories/IDepartmentRepository";
import { ServiceProviderIds } from "@/domain/ServiceProvideIds";
import { inject, injectable } from "tsyringe";

@injectable()
class DepartmentService {

  constructor(
    @inject(ServiceProviderIds.DepartmentRepository) private departmentRepository: IDepartmentRepository
  ) {}

  async getAllDepartments(): Promise<Department[]> {
    const departments = await this.departmentRepository.find({
      order: {
        name: 'ASC',
      }
    })

    return departments
  }

 }

export default DepartmentService