import { Address } from "../value_objects/Address";

export interface CustomerInterface {
    get id(): string
    get name(): string
    get address(): Address
}