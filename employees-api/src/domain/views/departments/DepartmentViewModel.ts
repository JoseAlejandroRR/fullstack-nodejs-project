import { Department } from '@/domain/models/Department'
import ViewModel from '../ViewModel'

/**
 * A view model for a Department Model.
 *
 * @swagger
 * components:
 *   schemas:
 *     DepartmentViewModel:
 *       description: Department Object Structure
 *       properties:
 *         id:
 *           type: string
 *           example: a8d56d51-1917-40ca-aa56-38a7acb2321b
 *         name:
 *           type: string
 *           example: development technology
 *         createdAt:
 *           type: string
 *           format: date-time
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\w{1}$'
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\w{1}$'
 */
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
