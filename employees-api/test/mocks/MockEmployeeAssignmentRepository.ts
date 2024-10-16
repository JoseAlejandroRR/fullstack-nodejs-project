import MockRepository from './MockRepository'
import { EmployeeAssignment } from '@/domain/models/EmployeeAssignment'
import IEmployeeAssignmentRepository from '@/domain/repositories/IEmployeeAssignmentRepository'

class MockEmployeeAssignmentRepository extends MockRepository<EmployeeAssignment>
  implements IEmployeeAssignmentRepository { }

export default MockEmployeeAssignmentRepository
