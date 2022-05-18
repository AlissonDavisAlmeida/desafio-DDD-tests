import { CustomerRepositoryInterface } from "../../../Domain/customer/repository/customer_repository.interface";
import { InputSearchCustomerDTO, OutputSearchCustomerDTO } from "./search_customer.dto";

export class SearchCustomer {

    #customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.#customerRepository = customerRepository
    }



    async execute(input: InputSearchCustomerDTO): Promise<OutputSearchCustomerDTO> {

        const customer = await this.#customerRepository.find(input.id)

        const output: OutputSearchCustomerDTO = {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number
            }
        }

        return output
    }
}