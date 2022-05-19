import { CustomerFactory } from "../../../Domain/customer/factory/customer.factory";
import { CustomerRepositoryInterface } from "../../../Domain/customer/repository/customer_repository.interface";
import { Address } from "../../../Domain/customer/value_objects/Address";
import { InputCreateCustomer, OutputCreateCustomer } from "./create_customer.dto";


export class CustomerCreateUseCase{

    #customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface){
        this.#customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomer): Promise<OutputCreateCustomer>{

        if(input.name.length === 0){
            throw Error("Name is required")
        }
        const address = new Address(input.address.street, input.address.number)
        const customer = CustomerFactory.create_with_address( input.name, address)

        await this.#customerRepository.create(customer)

        return {
            id: customer.id,
            name: customer.name,
            address: {
                number: address.number,
                street: address.street
            }
        }
    }
}