import { Department } from '../models/Department'
import { IRepository } from './IRepository'
interface IDepartmentRepository extends IRepository<Department> {

}

export default IDepartmentRepository
