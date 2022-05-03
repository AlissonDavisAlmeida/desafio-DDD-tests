import { EventInterface } from "../@shared/event.interface";
import { EventeDispatcherInterface } from "../@shared/event_dispatcher.interface";
import { EventHandlerInterface } from "../@shared/event_handler.interface";

export class EventDispatcher implements EventeDispatcherInterface {

    private eventHandler : { [eventName:string] : EventHandlerInterface<EventInterface>[]} = {}

    notify(event: EventInterface): void {
        const evtName = event.constructor.name
        if(this.eventHandler[evtName]){

            this.eventHandler[evtName].forEach(eventHand => eventHand.handle(event))
        }
        
    }
    
    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if(!this.eventHandler[eventName]){
            this.eventHandler[eventName] = []
        }

        this.eventHandler[eventName].push(eventHandler)
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if(!this.eventHandler[eventName]){
            throw new Error("Event is not exist")
        }

        this.eventHandler[eventName] = this.eventHandler[eventName].filter(event => event !== eventHandler)
    }

    unregisterALL(): void {
        this.eventHandler = {}
    }


    get getEventHandlers(){
        return this.eventHandler
    }
}