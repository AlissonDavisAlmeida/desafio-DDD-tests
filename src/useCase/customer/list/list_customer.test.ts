import { CustomerFactory } from "../../../Domain/customer/factory/customer.factory"
import { Address } from "../../../Domain/customer/value_objects/Address"
import { ListCustomer } from "./ListCustomer.case"



describe('Unit test for listing customers', () => {

    const address = new Address("Av. jpao", 2929)
    const customer1 = CustomerFactory.create_with_address("Alisson", address)
    const customer2 = CustomerFactory.create_with_address("Apolo", address)

    const MockRepository = () => ({
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2]))
    })

    test("should list a customer",async () => { 

        const customerRepository = MockRepository()
        const useCase = new ListCustomer(customerRepository)

        const output = await useCase.execute()

        expect(output.customers.length).toBe(2)
        expect(output.customers[0].id).toBe(customer1.id)
        expect(output.customers[0].name).toBe(customer1.name)
        
        expect(output.customers[1].id).toBe(customer2.id)
        expect(output.customers[1].name).toBe(customer2.name)


    })


})