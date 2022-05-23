import { ProductInterface } from "./product.interface"

export class Product implements ProductInterface{

     _id: string
     _name: string
     _price: number

    constructor(id: string, name: string, price: number){
        this._id = id
        this._name = name
        this._price = price

        this.validate()
    }

    get priceProduct(): number {
        return this._price
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
    changeName(newName : string){
        this._name = newName
    }
}