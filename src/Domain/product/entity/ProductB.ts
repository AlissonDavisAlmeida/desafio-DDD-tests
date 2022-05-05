import { ProductInterface } from "./product.interface"

export class ProductB implements ProductInterface{

    private _id: string
    private _name: string
    private _price: number

    constructor(id: string, name: string, price: number){
        this._id = id
        this._name = name
        this._price = price

        this.validate()
    }
    
    get priceProduct(): number {
        return this._price * 2
    }

    validate(){
        if(!this._id){
            throw new Error("Id is required")
        }
    }

    get name(){
        return this._name
    }

    get id(){
        return this._id
    }

    get price(){
        return this._price
    }

    changePrice(newPrice : number){
        this._price = newPrice
    }
}