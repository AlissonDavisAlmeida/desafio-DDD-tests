import { EventDispatcher } from "./event_dispatcher"
import { SendEmailWhenProductIsCreatedHandler } from "../../product/events/handlers/send_email.handler"
import { ProductCreatedEvent } from "../../product/events/product.event"


describe("Domain event tests",()=>{

    test("should register an event handler", ()=>{

        const eventDispatcher = new EventDispatcher()
        
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)


        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].includes(eventHandler)).toBeTruthy()
    })

    test("should unregister an event handler", ()=>{
        const eventDispatcher = new EventDispatcher()
        
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].includes(eventHandler)).toBeTruthy()

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].includes(eventHandler)).toBeFalsy()

    })

    test("should unregister all events", ()=>{
        const eventDispatcher = new EventDispatcher()
        
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
       

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].includes(eventHandler)).toBeTruthy()

        eventDispatcher.unregisterALL()


        expect(eventDispatcher.getEventHandlers).toEqual({})
    })

    test("should notify event", ()=>{
        const eventDispatcher = new EventDispatcher()
        
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        const spyEventHandler = jest.spyOn(eventHandler, "handle")
       

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        eventDispatcher.register("ProductCreated", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].includes(eventHandler)).toBeTruthy()
        expect(eventDispatcher.getEventHandlers["ProductCreated"].includes(eventHandler)).toBeTruthy()

        const event = new ProductCreatedEvent({
            name: "Product1",
            description: "sabão"
        })

        eventDispatcher.notify(event)

        expect(spyEventHandler).toHaveBeenCalled()

    })
})