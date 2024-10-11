import { Employee } from "../models/Employee";
import { IRepository } from "./IRepository";

interface IEmployeeRepository extends IRepository<Employee> {

}

export default IEmployeeRepository
