import { Address } from "../../entities/Address"
import { Custumer } from "../../entities/Customer"
import { CreateCustomerEvent } from "../customer/customer.event"
import { CustomerChangeAddress } from "../customer/customer_alterAddress.event"
import { CustomerChangeAddressHandler } from "../customer/handler/customer_changeAddress.handler"
import { CustomerCreatedHandler } from "../customer/handler/customer_created.handler"
import { CustomerCreatedHandler2 } from "../customer/handler/customer_created.handler2"
import { EventDispatcher } from "../implementations/event_dispatcher"


describe("Domain event tests",()=>{

    test("should register an event handler", ()=>{

        const eventDispatcher = new EventDispatcher()
        
        const eventHandler = new CustomerCreatedHandler()
        const eventHandler2 = new CustomerCreatedHandler2()

        eventDispatcher.register("CreateCustomerEvent", eventHandler)
        eventDispatcher.register("CreateCustomerEvent2", eventHandler2)


        expect(eventDispatcher.getEventHandlers["CreateCustomerEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["CreateCustomerEvent"].length).toBe(1)
        expect(eventDispatcher.getEventHandlers["CreateCustomerEvent"].includes(eventHandler)).toBeTruthy()
        expect(eventDispatcher.getEventHandlers["CreateCustomerEvent2"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["CreateCustomerEvent2"].length).toBe(1)
        expect(eventDispatcher.getEventHandlers["CreateCustomerEvent2"].includes(eventHandler2)).toBeTruthy()
    })

    test("should unregister an event handler", ()=>{
        const eventDispatcher = new EventDispatcher()
        
        const eventHandler = new CustomerCreatedHandler()

        eventDispatcher.register("CustomerCreatedHandler", eventHandler)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedHandler"].includes(eventHandler)).toBeTruthy()

        eventDispatcher.unregister("CustomerCreatedHandler", eventHandler)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedHandler"].includes(eventHandler)).toBeFalsy()

    })

    test("should unregister all events", ()=>{
        const eventDispatcher = new EventDispatcher()
        
        const eventHandler = new CustomerCreatedHandler()
       

        eventDispatcher.register("CustomerCreatedHandler", eventHandler)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedHandler"].includes(eventHandler)).toBeTruthy()

        eventDispatcher.unregisterALL()


        expect(eventDispatcher.getEventHandlers).toEqual({})
    })

    test("should notify event when customer is created", ()=>{
        const eventDispatcher = new EventDispatcher()
        
        const eventHandler = new CustomerCreatedHandler()
        const eventHandler2 = new CustomerCreatedHandler2()

        const spyEventHandler = jest.spyOn(eventHandler, "handle")
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle")
       

        eventDispatcher.register("CreateCustomerEvent", eventHandler)
        eventDispatcher.register("CreateCustomerEvent", eventHandler2)

        expect(eventDispatcher.getEventHandlers["CreateCustomerEvent"].includes(eventHandler)).toBeTruthy()
        expect(eventDispatcher.getEventHandlers["CreateCustomerEvent"].includes(eventHandler2)).toBeTruthy()

        const address = new Address("Av. José Ayrton", 541)
        const event = new CreateCustomerEvent(new Custumer("1", "Alisson",address))

        eventDispatcher.notify(event)

        expect(spyEventHandler).toHaveBeenCalled()
        expect(spyEventHandler2).toHaveBeenCalled()

    })

    test("should notify event when address customer is changed", ()=>{
        const eventDispatcher = new EventDispatcher()

        const eventHandler = new CustomerChangeAddressHandler()

        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        eventDispatcher.register("CustomerChangeAddress", eventHandler)

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddress"].includes(eventHandler)).toBeTruthy()

        const address = new Address("Av. José Ayrton", 541)
        const customer = new Custumer("1", "Alisson")
        customer.changeAddress(address)

        const event = new CustomerChangeAddress({
            id: customer.id,
            nome: customer.name,
            endereco: `Rua ${customer.address.street}, Nº${customer.address.number}`
        })

        eventDispatcher.notify(event)

        expect(spyEventHandler).toHaveBeenCalled()


    })
})