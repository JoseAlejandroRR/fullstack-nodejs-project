import 'dotenv/config'
import 'reflect-metadata'
import 'tsconfig-paths/register'

import { CreateEmployeeDto } from '@/application/dto/employees/CreateEmployee'
import EmployeeStatus from '@/domain/enums/EmployeeStatus'
import { Employee } from '@/domain/models/Employee'
import IEmployeeRepository from '@/domain/repositories/IEmployeeRepository'
import MockEmployeeRepository from './../../mocks/MockEmployeeRepository'
import EmployeeService from '@/application/services/EmployeeService'
import { UpdateEmployeeDto } from '@/application/dto/employees/UpdateEmployee'
import EntityNotFoundException from '@/domain/exceptions/EntityNotFoundException'
import { v4 } from 'uuid'
import IEmployeeAssignmentRepository from '@/domain/repositories/IEmployeeAssignmentRepository'
import { IEvent } from '@/domain/IEvent'
import MockEmployeeAssignmentRepository from './../../mocks/MockEmployeeAssignmentRepository'
import { MockEventBus } from './../../mocks/MockEventBust'
import { EventType } from '@/domain/EventType'
import { Department } from '@/domain/models/Department'
import { EmployeeAssignment } from '@/domain/models/EmployeeAssignment'

describe('EmployeeService Unit Tests', () => {
  let employeeService: EmployeeService
  let mockEmployeeRepository: IEmployeeRepository
  let mockAssignmentRepository: IEmployeeAssignmentRepository
  let mockEventBus: MockEventBus
  let employeeZero: Employee

  const handler = jest.fn(async (event: IEvent) => {
    //console.log(`Evento called: ${event.name}`);
  })

  beforeEach(async () => {
    mockEmployeeRepository = new MockEmployeeRepository()
    mockAssignmentRepository = new MockEmployeeAssignmentRepository()
    mockEventBus = new MockEventBus()
    employeeService = new EmployeeService(
      mockEmployeeRepository,
      mockAssignmentRepository,
      mockEventBus
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

  afterEach(() => {
    mockEventBus.clearSubscriptions()
  })

  test('[EmployeeService.createEmployee]: should create an employee with the Service', async () => {

    const employeeData: CreateEmployeeDto = {
      firstname: 'Jane',
      lastname: 'Smith',
      phone: '+1 234 122324',
      address: '3102 Newton Road',
      hiredAt: new Date(2020, 2, 23),
      status: EmployeeStatus.ACTIVE,
      departmentId: v4()
    }

    const department = new Department()

    department.name = 'IT'
    department.id = employeeData.departmentId!
    department.createdAt = new Date()
    department.updatedAt = new Date()

    mockEventBus.subscribe(EventType.Employee.Created, handler)

    const employee = await employeeService.createEmployee(employeeData)
    const assignment = employee.assignTo(department)

    await mockAssignmentRepository.create(assignment)

    const assignmentCreated = await employeeService.getAssignmentsByEmployee(employee)

    expect(employee).toBeDefined()
    expect(employee.firstname).toBe('Jane')
    expect(employee.lastname).toBe('Smith')
    expect(employee.status).toBe(EmployeeStatus.ACTIVE)
    expect(assignmentCreated.length).toBe(1)
    expect(assignmentCreated[0]).toBeInstanceOf(EmployeeAssignment)
    expect(mockEventBus.getSubscribedEvents()[0]).toBe(EventType.Employee.Created)
    expect(handler).toHaveBeenCalled()

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

    mockEventBus.subscribe(EventType.Employee.Updated, handler)

    const employee = await employeeService.updateEmployee(employeeZero.id, data)

    expect(employee).toBeDefined();
    expect(employee.firstname).toBe('Jose');
    expect(employee.lastname).toBe('Realza');
    expect(employee.status).toBe(EmployeeStatus.INACTIVE)
    expect(handler).toHaveBeenCalled()
    expect(mockEventBus.getSubscribedEvents()[0]).toBe(EventType.Employee.Updated)

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

  test('[EmployeeAssignment]: should create EmployeeAssignment instance', async () => {

    const assignment = new EmployeeAssignment()
    assignment.id = v4()
    assignment.employeeId = 1000
    assignment.departmentId = employeeZero.departmentId!
    assignment.createdAt = new Date()
    assignment.updatedAt = new Date()

    expect(assignment.departmentId).toBe(employeeZero.departmentId)
  })
})