import { Custumer } from "../../../Domain/customer/entity/Customer";
import { CustomerRepositoryInterface } from "../../../Domain/customer/repository/customer_repository.interface";
import { Address } from "../../../Domain/customer/value_objects/Address";
import { InputUpdateCustomer, OutputUpdateCustomer } from "./update_customer.dto";

export class CustomerUpdate{


    #customerRepository : CustomerRepositoryInterface

    constructor(customerRepository : CustomerRepositoryInterface){
        this.#customerRepository = customerRepository;
    }


    async execute(input : InputUpdateCustomer): Promise<OutputUpdateCustomer>{

        const customer = await this.#customerRepository.find(input.id)

        if(!customer || !input.id){
            throw new Error("Customer not found")
        }
        customer.changeAddress(new Address(input.address.street, input.address.number))
        customer.changeName(input.name)
        
        await this.#customerRepository.update(customer)


        const output: OutputUpdateCustomer = {
            id : customer.id,
            name: customer.name,
            address:{
                street: customer.address.street,
                number: customer.address.number
            }
        }

        return output
        
    }

}