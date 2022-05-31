import { Entity } from "../../@shared/entity/entity_abstract"
import { NotificationError } from "../../@shared/notification/notification_error"
import { CustomerValidatorFactory } from "../factory/customer_validator_factory"
import { Address } from "../value_objects/Address"
import { CustomerInterface } from "./customer.interface"

export class Custumer extends Entity implements CustomerInterface {
    private _name: string
    private _address: Address
    private _rewardsPoints: number = 0

    constructor(id: string, name: string, address?: Address) {
        super()
        this._id = id
        this._name = name
        this._address = address

        this.validate()

        if (this.notification.hasError()) {
            throw new NotificationError(this.notification.erros)
        }
    }

    validate(): void {
        const validator = CustomerValidatorFactory.create().validate(this)
        
        if(this._address){
            validator.validateAddress(this)
        }
    }

    addRewardsPoints(value: number) {
        this._rewardsPoints += value
    }

    changeAddress(address: Address) {
        this._address = address
    }

    changeName(name: string) {
        this._name = name
    }

    get rewardsPoints() {
        return this._rewardsPoints
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    get address() {
        return this._address
    }


}