import { EventInterface } from "../../@shared/event.interface";
import { EventHandlerInterface } from "../../@shared/event_handler.interface";
import { ProductCreatedEvent } from "../product.event";

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent>{


    handle(event: ProductCreatedEvent): void {
        console.log(event)
    }

   

}