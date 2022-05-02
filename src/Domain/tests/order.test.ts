import { Address } from "../entities/Address"
import { Custumer } from "../entities/Customer"
import { Order } from "../entities/Order"
import { OrderItem } from "../entities/OrderItem"


describe("Order unit tests",()=>{

    
    
    test('Calculate total price items', () => {
        
        const address = new Address("Av. José", 541)
        const customer = new Custumer("1", "Alisson", address)

        
        const item = new OrderItem("2","Sabão", 2, "p1", 4)
        const item2 = new OrderItem("3","chocolate", 5,"p2",2)
        const item3 = new OrderItem("4","detergente", 1, "p3",6)
        const order = new Order("1", customer._id, [item, item2, item3])
        
        expect(order.total).toEqual(24)
        
        
    })
    
})