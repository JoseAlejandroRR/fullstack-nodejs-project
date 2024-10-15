import { setSeederFactory } from 'typeorm-extension'
import { DEPARTMENTS_DATA_FAKE } from '../1728622371990-seed_departments'
import EmployeeStatus from './../../../domain/enums/EmployeeStatus'
import { Employee } from './../../../domain/models/Employee'

export const EmployeeFactory = setSeederFactory(Employee, (faker) => {
  const employee = new Employee()
  employee.firstname = faker.person.firstName()
  employee.lastname = faker.person.lastName()
  employee.phone = faker.phone.number()
  employee.address = faker.location.streetAddress()
  employee.status = Math.round(Math.random() * 2) > 0 ? EmployeeStatus.ACTIVE : EmployeeStatus.INACTIVE
  employee.hiredAt = faker.date.between({ from: '2020-01-01', to: '2023-01-01' })
  employee.departmentId = DEPARTMENTS_DATA_FAKE[Math.round(Math.random() * 3)].id 

  return employee
})
