import { CustomerCreateUseCase } from "./CreateCustomer.case"
import { InputCreateCustomer, OutputCreateCustomer } from "./create_customer.dto"

describe('Test create Customer', () => {

    const input: InputCreateCustomer = {
        name: 'Customer',
        address: {
            street: 'Av José',
            number: 340
        }
    }

    const MockRepository = () => {
        return {
            find: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            create: jest.fn()
        }
    }


    test("should create a customer", async () => {

        const customerRepository = MockRepository()
        const customerCreateUseCase = new CustomerCreateUseCase(customerRepository)

        const output: OutputCreateCustomer = {
            id: expect.any(String),
            name: input.name,
            address:{
                number: input.address.number,
                street: input.address.street,
            }
        }

        const result = await customerCreateUseCase.execute(input)

        expect(result).toEqual(output)

    })

    test("should throw an error when name is missing", async () => {
        
        const customerRepository = MockRepository()
        const customerCreateUseCase = new CustomerCreateUseCase(customerRepository)

        const output: OutputCreateCustomer = {
            id: expect.any(String),
            name: input.name,
            address:{
                number: input.address.number,
                street: input.address.street,
            }
        }

        input.name = ""

        

        await expect(customerCreateUseCase.execute(input)).rejects.toThrowError("Name is required")
    })

})