import { UUIDV1 } from "sequelize/types";
import { Custumer } from "../entity/Customer";
import { CustomerInterface } from "../entity/customer.interface";
import { Address } from "../value_objects/Address";


export class CustomerFactory{

    static create(name: string): CustomerInterface{
        return new Custumer("1", name)
    }

    static create_with_address(name: string, address: Address){
       const id = Math.random().toString()
        return new Custumer(id, name, address)
    }
}