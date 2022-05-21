import { CustomerInterface } from "../../../Domain/customer/entity/customer.interface";

export interface InputListCustomer {

}


export interface OutputListCustomer {

    customers: {
        id: string
        name: string
        address: {
            street: string
            number: number
        }
    }[]
}