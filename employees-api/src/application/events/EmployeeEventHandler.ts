import { inject, injectable } from 'tsyringe'
import { EventHandler } from '@/domain/EventHandler'
import { IEventBus } from '@/domain/IEventBus'
import { EventType } from '@/domain/EventType'
import { IEvent } from '@/domain/IEvent'
import { ServiceProviderIds } from '@/domain/ServiceProvideIds'
import { Employee } from '@/domain/models/Employee'
import IDepartmentRepository from '@/domain/repositories/IDepartmentRepository'
import IEmployeeAssignmentRepository from '@/domain/repositories/IEmployeeAssignmentRepository'

@injectable()
export class EmployeeEventHandler extends EventHandler  {

  constructor(
    @inject(ServiceProviderIds.EventBus) protected eventBus: IEventBus,
    @inject(ServiceProviderIds.DepartmentRepository) protected departmentRepository: IDepartmentRepository,
    @inject(ServiceProviderIds.EmployeeAssignmentRepository) protected assignmentRepository: IEmployeeAssignmentRepository,
  ) {
    super(eventBus)
  }

  protected subscribe(eventBus: IEventBus): void {

    this.eventBus.subscribe(
      EventType.Employee.Updated,
      async (event: IEvent) => {
        const { payload } = event
        const employee: Employee = payload.current
        const { beforeState } = payload

        if (employee.departmentId !== beforeState.departmentId) {
          const departmentNew = await this.departmentRepository.findByKey(employee.departmentId!)
          const assignmentOld = await this.assignmentRepository.findOne({
            where: {
              employeeId: employee.id,
              departmentId: beforeState.departmentId,
            }
          })

          if (assignmentOld) {
            assignmentOld.endDate = new Date()
            assignmentOld.isActive = false
            await this.assignmentRepository.update(assignmentOld)
          }

          if (!departmentNew) return
          const assignment = employee.assignTo(departmentNew)

          await this.assignmentRepository.create(assignment)
        }

      }
    )
  }

}