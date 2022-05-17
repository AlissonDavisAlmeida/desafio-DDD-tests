import {v4 as uuid} from "uuid"
import { OrderItem } from "../entity/OrderItem"
import { OrderFactory } from "./order.factory"
import { OrderProps } from "./orderProps.interface"

describe("Order Factory unit test", ()=>{


    test("should create an order", ()=>{

        const orderProps : OrderProps = {
            id: uuid(),
            customerID: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "product 1",
                    productID: uuid(),
                    quantity: 1,
                    price: 10
                }
            ]
        }

        const order = OrderFactory.create(orderProps)

        expect(order.id).toEqual(orderProps.id)
        expect(order.customerID).toEqual(orderProps.customerID)
        expect(order.items).toEqual(orderProps.items.map(item =>{
            return new OrderItem(item.id, item.name, item.price, item.productID, item.quantity)
        }))
    })
})