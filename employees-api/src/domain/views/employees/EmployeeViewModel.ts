import DepartmentViewModel from '../departments/DepartmentViewModel'
import ViewModel from '../ViewModel'
import { Employee } from '@/domain/models/Employee'

/**
 * A view model for a Employee Model.
 *
 * @swagger
 * components:
 *   schemas:
 *     EmployeeViewModel:
 *       description: Emploree Object Structure
 *       properties:
 *         id:
 *           type: number
 *           example: 1000
 *         firstname:
 *           type: string
 *           example: John
 *         lastname:
 *           type: string
 *           example: Smith
 *         fullName:
 *           type: string
 *           example: John Smith
 *         hiredAt:
 *           type: date
 *           example: 2020-02-04
 *         phone:
 *           type: string
 *           example: +1-622-2343234
 *         address:
 *           type: string
 *           example: 4889 Railroad Street
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\w{1}$'
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\w{1}$'
 */

class EmployeeViewModel extends ViewModel<Employee> {
  constructor(employee: Employee) {
    const view: Record<string, any> = {
      id: employee.id,
      firstname: employee.firstname,
      lastname: employee.lastname,
      fullName: `${employee.firstname} ${employee.lastname}`,
      hiredAt: employee.hiredAt,
      departmentId: employee.departmentId,
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
