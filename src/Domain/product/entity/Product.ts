import { Entity } from "../../@shared/entity/entity_abstract"
import { NotificationError } from "../../@shared/notification/notification_error"
import { ProductInterface } from "./product.interface"

export class Product extends Entity implements ProductInterface{

     _name: string
     _price: number

    constructor(id: string, name: string, price: number){
        super()
        this._id = id
        this._name = name
        this._price = price

        this.validate()

        if(this.notification.hasError()){
            throw new NotificationError(this.notification.erros)
        }
    }

    get priceProduct(): number {
        return this._price
    }

    validate(){
        if(!this._id){
            this.notification.addError({context:"product", message: "Id is not validate"})
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