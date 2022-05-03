import { EventInterface } from "../../@shared/event.interface";
import { EventHandlerInterface } from "../../@shared/event_handler.interface";
import { CreateCustomerEvent } from "../customer.event";


export class CustomerCreatedHandler implements EventHandlerInterface<CreateCustomerEvent>{
    
    handle(event: CreateCustomerEvent): void {
        console.log("Esse é o primeiro console.log do evento: "+event.constructor.name)
    }

}