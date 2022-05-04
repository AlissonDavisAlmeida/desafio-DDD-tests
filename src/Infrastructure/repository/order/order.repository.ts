import { Order } from "../../../Domain/checkout/entity/Order";
import { OrderItem } from "../../../Domain/checkout/entity/OrderItem";
import { OrderRepositoryInterface } from "../../../Domain/checkout/repository/order.interface";
import { OrderModel } from "../../database/sequelize/models/order-model";
import { OrderItemModel } from "../../database/sequelize/models/orderItem-model";

export class OrderRepository implements OrderRepositoryInterface{

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity._id,
            customer_id: entity._customerID,
            total: entity.total,
            items: entity._items.map(item=> ({
                id: item.id, 
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId
            }))
        }, 
        {
            include:[{model: OrderItemModel}]
        }
        )
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            id: entity._id,
            customer_id: entity._customerID,
            total: entity.total,
            items: entity._items.map(item=> ({
                id: item.id, 
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId
            }))
        },
        {where:{id : entity._id}},
        )
    }

    async find(id: string): Promise<Order> {

        const orderModel = await OrderModel.findOne({where:{id: id}, include:["items"]})

        const items = orderModel.items.map(item => {
            return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
        })
        const order = new Order(orderModel.id, orderModel.customer_id, items)

        return order
        
    }


    async findAll(): Promise<Order[]> {
        try{

            const orderModels = await OrderModel.findAll({include:["items"]})
            const orderList = orderModels.map(orderModel => {
                
                const items = orderModel.items.map(item => {
                    return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
                })
                
                const order = new Order(orderModel.id, orderModel.customer_id, items)
                return order
            })
            
            return orderList
        }catch(err){
            console.log(err)
        }

    }


    
}