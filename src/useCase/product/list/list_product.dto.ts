
export interface InputListProduct {
    input: {}
}


export interface OutputListProduct {

    products: {
        id: string;
        name: string;
        price: number;
    }[]
}