import { CustomerFactory } from "../../../Domain/customer/factory/customer.factory"
import { Address } from "../../../Domain/customer/value_objects/Address"
import { CustomerUpdate } from "./CustomerUpdate.case"
import { InputUpdateCustomer } from "./update_customer.dto"

describe('Unit test to update customer', () => {

    const address = new Address("Av. José", 541)
    const customer = CustomerFactory.create_with_address("Alisson", address)

    const input: InputUpdateCustomer = {
        id: customer.id,
        name: "Davi",
        address: {
            street: "Rua da Rua",
            number: 542
        }
    }

    const MockRepository = () => ({
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    })

    test("should update customer",async () => {

        const customerRepository = MockRepository()

        const customerCase = new CustomerUpdate(customerRepository)
        

        const output = await customerCase.execute(input)

        expect(output).toEqual(input)

    })

    test("should throw an error when updating a empty customer", async () => {

        const customerRepository = MockRepository()

        const customerCase = new CustomerUpdate(customerRepository)
        input.id = null
        await expect(customerCase.execute(input)).rejects.toThrowError("Customer not found")
    })
})