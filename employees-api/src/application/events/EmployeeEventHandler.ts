import { inject, injectable } from 'tsyringe'
import { EventHandler } from '@/domain/EventHandler'
import { IEventBus } from '@/domain/IEventBus'
import { EventType } from '@/domain/EventType'
import { IEvent } from '@/domain/IEvent'
import { ServiceProviderIds } from '@/domain/ServiceProvideIds'

@injectable()
export class EmployeeEventHandler extends EventHandler  {

  constructor(
    @inject(ServiceProviderIds.EventBus) protected eventBus: IEventBus
  ) {
    super(eventBus)
  }

  protected subscribe(eventBus: IEventBus): void {

    this.eventBus.subscribe(
      EventType.Employee.Updated,
      async (event: IEvent) => {
        console.log("EventType.Employee.Updated", event)
      }
    )
  }

}