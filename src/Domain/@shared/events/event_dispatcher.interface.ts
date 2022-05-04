import { EventInterface } from "./event.interface";
import { EventHandlerInterface } from "./event_handler.interface";

export interface EventeDispatcherInterface {

    notify(event: EventInterface): void
    register(eventName: string, eventHandler: EventHandlerInterface): void
    unregister(eventName: string, eventHandler: EventHandlerInterface): void
    unregisterALL(): void
}