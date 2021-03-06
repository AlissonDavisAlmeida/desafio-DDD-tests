import { EventInterface } from "../../@shared/event.interface";

export class CreateCustomerEvent implements EventInterface{
    
    dateTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any){
        this.dateTimeOcurred = new Date()
        this.eventData = eventData
    }

}