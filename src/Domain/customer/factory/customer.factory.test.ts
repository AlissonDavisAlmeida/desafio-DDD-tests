import { Address } from "../value_objects/Address"
import { CustomerFactory } from "./customer.factory"


describe("Customer factory unit test", ()=>{

    test("should create a customer",()=>{

        const customer = CustomerFactory.create("Alisson")
    
        expect(customer.id).toBeDefined()
        expect(customer.name).toEqual("Alisson")
        expect(customer.address).toBeUndefined()
    })

    test("should create a customer with an address", ()=>{
        const address = new Address("av jose", 541)

        const customer = CustomerFactory.create_with_address("Alisson", address)


        expect(customer.id).toBeDefined()
        expect(customer.name).toEqual("Alisson")
        expect(customer.address).toStrictEqual(address)
    })
})