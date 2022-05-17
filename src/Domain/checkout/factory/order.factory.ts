import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";
import { OrderProps } from "./orderProps.interface";


export class OrderFactory {

    static create(orderProps: OrderProps): Order {

        const items = orderProps.items.map(item => {

            return new OrderItem(item.id, item.name, item.price, item.productID, item.quantity)
        })

        const order = new Order(orderProps.id, orderProps.customerID, items)

        return order

    }
}