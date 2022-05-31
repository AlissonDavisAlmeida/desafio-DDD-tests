import { Address } from "../../customer/value_objects/Address";
import { Entity } from "../entity/entity_abstract";

export interface ValidatorInterface<T extends Entity> {

    validate(entity: T): this

    validateAddress?(entity : T):void
}