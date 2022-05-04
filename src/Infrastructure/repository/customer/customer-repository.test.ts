import { Sequelize } from "sequelize-typescript"
import { Address } from "../../../Domain/customer/value_objects/Address"
import { Custumer } from "../../../Domain/customer/entity/Customer"
import { CustomerModel } from "../../database/sequelize/models/customer-model"
import { CustomerRepository } from "./customer-repository"



describe("Customer Repository test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })


    test("should create a customer", async () => {

        const customerRepository = new CustomerRepository()
        const address = new Address("Av. jose", 541)
        const customer = new Custumer("1", "Alisson", address)

        await customerRepository.create(customer)

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            street: address.street,
            number: address.number,
            rewardPoints: customer.rewardsPoints
        })
    })


    test("should update a customer", async () => {

        const customerRepository = new CustomerRepository()
        const address = new Address("Av. jose", 541)
        const customer = new Custumer("1", "Alisson", address)

        await customerRepository.create(customer)

        customer.addRewardsPoints(10)

        await customerRepository.update(customer)

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Alisson",
            street: "Av. jose",
            number: 541,
            rewardPoints: customer.rewardsPoints
        })
    })


    test("should find a customer", async () => {
        const customerRepository = new CustomerRepository()
        const address = new Address("Av. jose", 541)
        const customer = new Custumer("1", "Alisson", address)

        await customerRepository.create(customer)

        const foundCustomer = await customerRepository.find("1")

        expect(foundCustomer).toEqual(new Custumer(
            customer.id,
            customer.name,
            address
        ))


    })

    test("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository()

        expect(async ()=>{
            await customerRepository.find("afafasd")
        }).rejects.toThrow("Customer not Found")
    })

    test("should find all products", async () => {
        const customerRepository = new CustomerRepository()
        const address = new Address("Av. jose", 541)

        const customer = new Custumer("1", "customer1", address)
        const customer2 = new Custumer("2", "customer2", address)
        const customer3 = new Custumer("3", "customer3", address)

        await customerRepository.create(customer)
        await customerRepository.create(customer2)
        await customerRepository.create(customer3)

        const foundCustomer = await customerRepository.findAll()
        const customers = [customer, customer2, customer3]

        expect(customers).toEqual(foundCustomer)

    })




    afterEach(async () => {
        await sequelize.close()
    })
})