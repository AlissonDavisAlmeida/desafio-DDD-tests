import { Address } from "../value_objects/Address"
import { CustomerInterface } from "./customer.interface"

export class Custumer implements CustomerInterface{
    private _id: string
    private _name: string
    private _address: Address
    private _rewardsPoints: number = 0

    constructor(id: string, name: string, address?: Address) {
        this._id = id
        this._name = name
        this._address = address
    }

    addRewardsPoints(value : number){
        this._rewardsPoints += value
    }

    changeAddress(address : Address){
        this._address = address
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