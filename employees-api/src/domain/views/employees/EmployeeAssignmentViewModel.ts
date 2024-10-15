import { EmployeeAssignment } from '@/domain/models/EmployeeAssignment'
import DepartmentViewModel from '../departments/DepartmentViewModel'
import ViewModel from '../ViewModel'

/**
 * A view model for a EmployeeAssignment Model.
 *
 * @swagger
 * components:
 *   schemas:
 *     EmployeeAssignmentViewModel:
 *       description: EmployeeAssignment Object Structure
 *       properties:
 *         id:
 *           type: string
 *           example: a8d56d51-1917-40ca-aa56-38a7acb2321b
 *         employeeId:
 *           type: number
 *           example: 1000
 *         employee:
 *           $ref: "#/components/schemas/UserViewModel"
 *         departmentId:
 *           type: string
 *           example: a8d56d51-1917-40ca-aa56-38a7acb2321b
 *         department:
 *           $ref: "#/components/schemas/DepartmentViewModel"
 *         startDate:
 *           type: string
 *           format: date-time
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\w{1}$'
 *         endDate:
 *           type: string
 *           format: date-time
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\w{1}$'
 *         status:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\w{1}$'
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\w{1}$'
 */

class EmployeeAssignmentViewModel extends ViewModel<EmployeeAssignment> {
  constructor(assignment: EmployeeAssignment) {
    const view: Record<string, any> = {
      id: assignment.id,
      employeeId: assignment.id,
      departmentId: assignment.departmentId,
      startDate: assignment.startDate,
      endDate: assignment.endDate,
      isActive: assignment.isActive,
      createdAt: assignment.createdAt,
      updatedAt: assignment.updatedAt,
    }

    if (assignment.department) {
      view.department = ViewModel.createOne(DepartmentViewModel, assignment.department)
    }

    super(view)
  }
}

export default EmployeeAssignmentViewModel
