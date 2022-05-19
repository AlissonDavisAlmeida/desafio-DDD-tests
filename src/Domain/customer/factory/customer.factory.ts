import { Custumer } from "../entity/Customer";
import { CustomerInterface } from "../entity/customer.interface";
import { Address } from "../value_objects/Address";


export class CustomerFactory{

    static create(name: string): CustomerInterface{
        return new Custumer("1", name)
    }

    static create_with_address(name: string, address: Address){
       
        return new Custumer("1", name, address)
    }
}