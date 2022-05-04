import { EventHandlerInterface } from "../../../@shared/events/event_handler.interface";
import { CustomerChangeAddress } from "../customer_alterAddress.event";


export class CustomerChangeAddressHandler implements EventHandlerInterface<CustomerChangeAddress>{


    handle(event: CustomerChangeAddress): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`);
    }


}