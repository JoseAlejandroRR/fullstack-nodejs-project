import { Department } from "@/domain/models/Department";
import ViewModel from "../ViewModel";

class DepartmentViewModel extends ViewModel<Department> {
  constructor(department: Department) {
    const view: Record<string, any> = {
      id: department.id,
      name: department.name,
      createdAt: department.createdAt,
      updatedAt: department.updatedAt,
    }

    super(view)
  }
}

export default DepartmentViewModel
