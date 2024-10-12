import { CreateEmployeeDto } from '@/application/dto/employees/CreateEmployee'
import EmployeeStatus from '@/domain/enums/EmployeeStatus'
import { Employee } from '@/domain/models/Employee'
import IEmployeeRepository from '@/domain/repositories/IEmployeeRepository'
import MockEmployeeRepository from './../../mocks/MockEmployeeRepository'
import EmployeeService from '@/application/services/EmployeeService'
import { UpdateEmployeeDto } from '@/application/dto/employees/UpdateEmployee'
import EntityNotFoundException from '@/domain/exceptions/EntityNotFoundException'
import { v4 } from 'uuid'

describe('EmployeeService Unit Tests', () => {
  let employeeService: EmployeeService
  let mockEmployeeRepository: IEmployeeRepository
  let employeeZero: Employee

  beforeEach(async () => {
    mockEmployeeRepository = new MockEmployeeRepository()
    employeeService = new EmployeeService(
      mockEmployeeRepository
    )

    const data: CreateEmployeeDto = {
      firstname: 'Jane',
      lastname: 'Smith',
      phone: '+1 234 122324',
      address: '3102 Newton Road',
      hiredAt: new Date(2020, 2, 23),
      status: EmployeeStatus.ACTIVE
    }

    employeeZero = await employeeService.createEmployee(data)
  })

  test('[EmployeeService.createEmployee]: should create an employee with the Service', async () => {

    const data: CreateEmployeeDto = {
      firstname: 'Jane',
      lastname: 'Smith',
      phone: '+1 234 122324',
      address: '3102 Newton Road',
      hiredAt: new Date(2020, 2, 23),
      status: EmployeeStatus.ACTIVE
    }

    const employee = await employeeService.createEmployee(data)

    expect(employee).toBeDefined()
    expect(employee.firstname).toBe('Jane')
    expect(employee.lastname).toBe('Smith')
    expect(employee.status).toBe(EmployeeStatus.ACTIVE)

  })

  test('[EmployeeService.updateEmployee]: should create an employee with the Service', async () => {

    const data: UpdateEmployeeDto = {
      firstname: 'Jose',
      lastname: 'Realza',
      status: EmployeeStatus.INACTIVE,
      phone: '+1 234 122322',
      address: '3100 Newton Road',
      hiredAt: new Date(2020, 10, 20),
      departmentId: v4(),
    }

    const employee = await employeeService.updateEmployee(employeeZero.id, data)

    expect(employee).toBeDefined();
    expect(employee.firstname).toBe('Jose');
    expect(employee.lastname).toBe('Realza');
    expect(employee.status).toBe(EmployeeStatus.INACTIVE)

  })

  test('[EmployeeService.getEmployeeById]: should get Employe Entity  with the Service', async () => {

    const employee = await employeeService.getEmployeeById(employeeZero.id)

    expect(employee).toBeDefined()
    expect(employee.firstname).toBe('Jane')
    expect(employee.lastname).toBe('Smith')
    expect(employee.status).toBe(EmployeeStatus.ACTIVE)

  })

  test('[EmployeeService.getEmployeeById]: should throw EntityNotFoundException', async () => {

    await expect(async () => await employeeService.getEmployeeById(employeeZero.id+1))
      .rejects.toThrow(EntityNotFoundException)

  })

  test('[EmployeeService.getAllEmployees]: should get two Entities', async () => {

    const data: CreateEmployeeDto = {
      firstname: 'Jane',
      lastname: 'Smith',
      phone: '+1 234 122324',
      address: '3102 Newton Road',
      hiredAt: new Date(2020, 2, 23),
      status: EmployeeStatus.ACTIVE
    }

    await employeeService.createEmployee(data)

    const employees = await employeeService.getAllEmployees()

    expect(employees.length).toBe(2)

  })

  test('[EmployeeService.deleteEmployee]: should delete the only Record', async () => {

    await employeeService.deleteEmployee(employeeZero.id)

    const employees = await employeeService.getAllEmployees()

    expect(employees.length).toBe(0)

  })
})