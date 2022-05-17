import { OrderItem } from "./OrderItem"

export class Order {
    _id: string
    _customerID: string
    _items: OrderItem[] = []


    constructor(id: string, customerID: string, items: OrderItem[]) {
        this._id = id
        this._customerID = customerID
        this._items = items
    }

    get total(): number {

        return this._items.reduce((prev, atual) => prev + atual.price, 0)
    }

    get id(){
        return this._id
    }

    get customerID(){
        return this._customerID
    }

    get items(){
        return this._items
    }
}