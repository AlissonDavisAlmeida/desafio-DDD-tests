import { Sequelize } from "sequelize-typescript"
import { Custumer } from "../../../Domain/customer/entity/Customer"
import { CustomerFactory } from "../../../Domain/customer/factory/customer.factory"
import { Address } from "../../../Domain/customer/value_objects/Address"
import { CustomerRepository } from "../../../Infrastructure/customer/repository/customer-repository"
import { CustomerModel } from "../../../Infrastructure/customer/sequelize/model/customer-model"
import { SearchCustomer } from "./SearchCustomer.case"
import { OutputSearchCustomerDTO } from "./search_customer.dto"


describe("Test search customer use case", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    test("should find a customer", async ()=>{

        
        const address = new Address("Av josé", 541)
        const customer = new Custumer("123", "Alisson", address)
        
        const customerRepository = new CustomerRepository()
        await customerRepository.create(customer)
        
        const useCase = new SearchCustomer(customerRepository)

        const input ={
            id: customer.id
        }    

        const output: OutputSearchCustomerDTO = {
            id: customer.id,
            name: customer.name,
            address:{
                number: customer.address.number,
                street: customer.address.street
            }
        }

        const result = await useCase.execute(input)


        expect(result).toEqual(output)

    })
})