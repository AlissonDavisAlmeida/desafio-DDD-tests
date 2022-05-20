export interface InputUpdateCustomer {
    id: string;
    name: string;
    address: {

        street: string;
        number: number;
    }
}


export interface OutputUpdateCustomer {

    id: string;
    name: string;
    address: {
        street: string;
        number: number;
    }
}