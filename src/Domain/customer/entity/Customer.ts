import { Entity } from "../../@shared/entity/entity_abstract"
import { NotificationError } from "../../@shared/notification/notification_error"
import { Address } from "../value_objects/Address"
import { CustomerInterface } from "./customer.interface"

export class Custumer  extends Entity implements CustomerInterface {
    private _name: string
    private _address: Address
    private _rewardsPoints: number = 0

    constructor(id: string, name: string, address?: Address) {
        super()
        this._id = id
        this._name = name
        this._address = address
        this.validate()

        if(this.notification.hasError()){
            throw new NotificationError(this.notification.erros)
        }
    }

    validate(): void {
        if(this._id.length === 0){
            this.notification.addError({context:"customer", message: "Id is not validate"})
        }
        if(this._name.length === 0){
            
            this.notification.addError({context:"customer", message: "Name is not validate"})
        }
    }

    addRewardsPoints(value : number){
        this._rewardsPoints += value
    }

    changeAddress(address : Address){
        this._address = address
    }

    changeName(name : string){
        this._name = name
    }

    get rewardsPoints(){
        return this._rewardsPoints
    }

    get id(){
        return this._id
    }

    get name(){
        return this._name
    }

    get address(){
        return this._address
    }


}