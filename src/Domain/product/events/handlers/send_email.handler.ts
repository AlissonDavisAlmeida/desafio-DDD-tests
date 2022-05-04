import { EventInterface } from "../../../@shared/events/event.interface";
import { EventHandlerInterface } from "../../../@shared/events/event_handler.interface";
import { ProductCreatedEvent } from "../product.event";

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent>{


    handle(event: ProductCreatedEvent): void {
        console.log(event)
    }

   

}