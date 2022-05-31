import { CustomerValidatorFactory } from "../factory/customer_validator_factory"

export class Address{
    
    private _street: string = ""
    private _number: number = 0


    constructor(street : string, number: number){
        this._street = street
        this._number = number
    }

    

    tostring(){
        return `Rua ${this._street}, Nº ${this._number}`
    }


    get street(){
        return this._street
    }

    get number(){
        return this._number
    }

}