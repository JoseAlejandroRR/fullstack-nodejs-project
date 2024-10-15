import { injectable } from 'tsyringe'
import { IEvent } from '@/domain/IEvent'
import { IEventBus } from '@/domain/IEventBus'

@injectable()
export class LocalEventBus implements IEventBus {
  private handlers: Map<string, Array<(event: IEvent) => Promise<void>>>

  constructor() {
    this.handlers = new Map()
  }

  async publish(event: IEvent): Promise<void> {
    const handlers = this.handlers.get(event.name) || []
    for (const handler of handlers) {
      await handler(event)
    }
  }

  subscribe(eventName: string, handler: (event: IEvent) => Promise<void>): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, [])
    }
    this.handlers.get(eventName)?.push(handler)
  }
}
