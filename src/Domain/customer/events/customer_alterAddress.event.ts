import { EventInterface } from "../../@shared/events/event.interface";


export class CustomerChangeAddress implements EventInterface{

    dateTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any){
        this.dateTimeOcurred = new Date()
        this.eventData = eventData
    }
}