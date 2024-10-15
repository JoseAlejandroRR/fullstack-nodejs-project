import { EmployeeAssignment } from '../models/EmployeeAssignment'
import { IRepository } from './IRepository'

interface IEmployeeAssignmentRepository extends IRepository<EmployeeAssignment> {

}

export default IEmployeeAssignmentRepository
