import { CustomerRepositoryInterface } from "../../../Domain/customer/repository/customer_repository.interface";
import { OutputListCustomer } from "./list_customer.dto";

export class ListCustomer{

    #customerRepository : CustomerRepositoryInterface

    constructor(customerRepository : CustomerRepositoryInterface){
        this.#customerRepository = customerRepository;
    }


    async execute(): Promise<OutputListCustomer>{

        const result = await this.#customerRepository.findAll()
        let array = result.map(customer => ({
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number
            }
        })) 
        const output : OutputListCustomer = {
            customers :array
        } 

        return output
    }
 

}