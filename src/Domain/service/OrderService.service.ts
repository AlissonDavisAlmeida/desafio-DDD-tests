import { Custumer } from "../entities/Customer";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";

export class OrderService{


    static placeOrder(customer: Custumer, items: OrderItem[]): Order {
        const order = new Order("o1", customer.id, items)

        const points = order.total / 2
        customer.addRewardsPoints(points)

        return order
    }

    static getTotal(orders : Order[]): number {
        return orders.reduce((acc, atual)=>{
            return acc + atual.total
        }, 0)
    }


}