import { Custumer } from "../../../Domain/customer/entity/Customer"
import { Address } from "../../../Domain/customer/value_objects/Address"
import { CustomerRepository } from "../../../Infrastructure/customer/repository/customer-repository"
import { SearchCustomer } from "./SearchCustomer.case"
import { OutputSearchCustomerDTO } from "./search_customer.dto"


const address = new Address("Av josé", 541)
const customer = new Custumer("123", "Alisson", address)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}   

describe("Test search customer use case", () => {

    test("should find a customer", async () => {


        const address = new Address("Av josé", 541)
        const customer = new Custumer("123", "Alisson", address)

        const customerRepository = MockRepository()
        await customerRepository.create(customer)

        const useCase = new SearchCustomer(customerRepository)

        const input = {
            id: customer.id
        }

        const output: OutputSearchCustomerDTO = {
            id: customer.id,
            name: customer.name,
            address: {
                number: customer.address.number,
                street: customer.address.street
            }
        }

        const result = await useCase.execute(input)


        expect(result).toEqual(output)

    })
})