import { CustomerInterface } from "../../../Domain/customer/entity/customer.interface";

export interface InputListProduct {

}


export interface OutputListProduct {

    products: {
        id: string;
        name: string;
        price: number;
    }[]
}