export interface InputCreateCustomer{
    name: string;
    address: {
        street: string;
        number: number;
    },
}

export interface OutputCreateCustomer{
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
    }
}

