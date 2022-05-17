export interface InputSearchCustomerDTO{
    id: string
}


export interface OutputSearchCustomerDTO{
    id: string
    name: string
    address:{
        street: string
        number: number
    }
}