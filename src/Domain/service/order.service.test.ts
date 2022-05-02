import { Address } from "../entities/Address"
import { Custumer } from "../entities/Customer"
import { Order } from "../entities/Order"
import { OrderItem } from "../entities/OrderItem"
import { OrderService } from "./OrderService.service"


describe('Order Service unit tests', () => { 

    test("should place an order", ()=>{
        const address = new Address("av. jose", 541)
        const customer = new Custumer("1", "Alisson", address)

        const ordemItem = new OrderItem("or1", "item1", 10, "1", 2)

        const order = OrderService.placeOrder(customer, [ordemItem])

        expect(customer.rewardsPoints).toEqual(10)
        expect(order.total).toEqual(20)
    })


    test("should get total of all orders", ()=>{

        const orders = []
        
        const ordemItem = new OrderItem("or1", "item1", 10, "1", 2)
        const ordemItem2 = new OrderItem("or2", "item2", 4, "2", 2)

        const order = new Order("o1", "1", [ordemItem, ordemItem2])
        const order2 = new Order("o2", "1", [ordemItem2])

        const total = OrderService.getTotal([order, order2])

        expect(total).toEqual(36)

    })

 })