import DepartmentViewModel from '../departments/DepartmentViewModel'
import ViewModel from '../ViewModel'
import { Employee } from '@/domain/models/Employee'

class EmployeeViewModel extends ViewModel<Employee> {
  constructor(employee: Employee) {
    const view: Record<string, any> = {
      id: employee.id,
      firstname: employee.firstname,
      lastname: employee.lastname,
      fullName: `${employee.firstname} ${employee.lastname}`,
      phone: employee.phone,
      address: employee.address,
      status: employee.status,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    }

    if (employee.department) {
      view.department = ViewModel.createOne(DepartmentViewModel, employee.department)
    }

    super(view)
  }
}

export default EmployeeViewModel
