import { Sequelize } from "sequelize-typescript";
import { Address } from "../../../Domain/entities/Address";
import { Custumer } from "../../../Domain/entities/Customer";
import { CustomerRepositoryInterface } from "../../../Domain/repository_interfaces/customer/customer_repository.interface";
import { CustomerModel } from "../../database/sequelize/models/customer-model";


export class CustomerRepository implements CustomerRepositoryInterface {


    async create(entity: Custumer): Promise<void> {

        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            rewardPoints: entity.rewardsPoints
        })
    }

    async update(entity: Custumer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                rewardPoints: entity.rewardsPoints
            },
            {
                where: { id: entity.id }
            }
        )
    }

    async find(id: string): Promise<Custumer> {

        let customerModel

        try {

            customerModel = await CustomerModel.findOne({ where: { id } })
        } catch (error) {
            throw new Error("Customer not Found")
        }



        const address = new Address(customerModel.street, customerModel.number)
        const customer = new Custumer(customerModel.id, customerModel.name, address)


        return customer
    }

    async findAll(): Promise<Custumer[]> {

        const customerModel = await CustomerModel.findAll()

        const products = customerModel.map(customer => {
            const address = new Address(customer.street, customer.number)
            return new Custumer(customer.id, customer.name, address)
        })

        return products
    }
}