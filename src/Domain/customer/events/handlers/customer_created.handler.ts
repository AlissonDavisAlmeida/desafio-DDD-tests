import { EventInterface } from "../../../@shared/events/event.interface";
import { EventHandlerInterface } from "../../../@shared/events/event_handler.interface";
import { CreateCustomerEvent } from "../../../customer/events/customer.event";


export class CustomerCreatedHandler implements EventHandlerInterface<CreateCustomerEvent>{
    
    handle(event: CreateCustomerEvent): void {
        console.log("Esse é o primeiro console.log do evento: "+event.constructor.name)
    }

}