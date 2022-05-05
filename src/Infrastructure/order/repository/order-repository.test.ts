import { Sequelize } from "sequelize-typescript"
import { Address } from "../../../Domain/customer/value_objects/Address"
import { Custumer } from "../../../Domain/customer/entity/Customer"
import { Order } from "../../../Domain/checkout/entity/Order"
import { OrderItem } from "../../../Domain/checkout/entity/OrderItem"
import { Product } from "../../../Domain/product/entity/Product"
import { CustomerModel } from "../../customer/sequelize/model/customer-model"
import { OrderModel } from "../sequelize/model/order-model"
import { ProductModel } from "../../product/sequelize/model/product-model"
import { ProductRepository } from "../../product/repository/product-repository"
import { OrderRepository } from "./order.repository"
import { CustomerRepository } from "../../customer/repository/customer-repository"
import { OrderItemModel } from "../sequelize/model/orderItem-model"



describe("Order Repository test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel])
        await sequelize.sync()
    })



    test("should create a new order", async () => {

        const customerRepository = new CustomerRepository()

        const address = new Address("av. josão", 541)
        const customer = new Custumer("1", "Alisson", address)

        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("1", "sabão", 3)
        await productRepository.create(product)

        const ordemItem = new OrderItem("1", product.name, product.price, product.id, 2)



        const order = new Order("1", customer.id, [ordemItem])
        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const orderFound = await OrderModel.findOne({
            where: {
                id: order._id
            },
            include: ["items"]
        });

        expect(orderFound.toJSON()).toStrictEqual({
            id: order._id,
            customer_id: customer.id,
            total: order.total,
            items: [{
                id: ordemItem.id,
                order_id: order._id,
                name: ordemItem.name,
                quantity: ordemItem.quantity,
                price: ordemItem.price,
                product_id: ordemItem.productId
            }
            ]
        })
    })


    test("should update a order", async () => {

        const customerRepository = new CustomerRepository()

        const address = new Address("av. josão", 541)
        const customer = new Custumer("1", "Alisson", address)

        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("1", "sabão", 3)
        await productRepository.create(product)

        const ordemItem = new OrderItem("1", product.name, product.price, product.id, 2)

        const order = new Order("1", customer.id, [ordemItem])
        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        product.changePrice(10)

        await orderRepository.update(order)

        const orderFound = await OrderModel.findOne({
            where: {
                id: order._id
            },
            include: ["items"]
        });

        expect(orderFound.toJSON()).toStrictEqual({
            id: order._id,
            customer_id: customer.id,
            total: order.total,
            items: [{
                id: ordemItem.id,
                order_id: order._id,
                name: ordemItem.name,
                quantity: ordemItem.quantity,
                price: ordemItem.price,
                product_id: ordemItem.productId
            }
            ]
        })

    })


    test("should find a order", async () => {

        const customerRepository = new CustomerRepository()

        const address = new Address("av. josão", 541)
        const customer = new Custumer("1", "Alisson", address)

        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("1", "sabão", 3)
        await productRepository.create(product)

        const ordemItem = new OrderItem("1", product.name, product.price, product.id, 2)

        const order = new Order("1", customer.id, [ordemItem])
        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const orderFound = await orderRepository.find(order._id)


        expect(orderFound).toStrictEqual(new Order(
            orderFound._id,
            orderFound._customerID,
            orderFound._items
        ))

    })

    test("should find all orders", async () => {

        const customerRepository = new CustomerRepository()

        const address = new Address("av. josão", 541)
        const customer = new Custumer("1", "Alisson", address)

        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("1", "sabão", 3)
        await productRepository.create(product)

        const ordemItem = new OrderItem("1", product.name, product.price, product.id, 2)
        const ordemItem2 = new OrderItem("12", product.name, product.price, product.id, 2)

        const order = new Order("1", customer.id, [ordemItem])
        const order2 = new Order("2", customer.id, [ordemItem2])
        const orderRepository = new OrderRepository()

    
            await orderRepository.create(order)
            await orderRepository.create(order2)
        


        const ordersFound = await orderRepository.findAll()

        const orderList = [order, order2]

        expect(ordersFound).toStrictEqual(orderList.map(order=>{
            const item = order._items.map(i=>{
                return new OrderItem(i.id, i.name, i.price, i.productId, i.quantity)
            })

            const o = new Order(order._id, order._customerID, item)
            return o
        }))
    })

    afterEach(async () => {
        await sequelize.close()
    })
})