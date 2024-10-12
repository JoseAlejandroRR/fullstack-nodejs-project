import { Employee } from '@/domain/models/Employee';
import MockRepository from './MockRepository';
import IEmployeeRepository from '@/domain/repositories/IEmployeeRepository';

class MockEmployeeRepository extends MockRepository<Employee>
  implements IEmployeeRepository {

}

export default MockEmployeeRepository