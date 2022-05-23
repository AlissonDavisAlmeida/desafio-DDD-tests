import { Sequelize } from "sequelize-typescript"
import { ProductRepository } from "../../../Infrastructure/product/repository/product-repository"
import { ProductModel } from "../../../Infrastructure/product/sequelize/model/product-model"
import { ProductCreate } from "./CreateProduct.case"
import { InputCreateProduct, OutputCreateProduct } from "./create_product.dto"




describe("Test create product use case", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

         sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    test("should create a product", async ()=>{

  
        const productRepository = new ProductRepository()
        
        const useCase = new ProductCreate(productRepository)
        
        const input: InputCreateProduct ={
            name: "product1",
            price: 100
        }    

        const output: OutputCreateProduct = {
            id: expect.any(String),
            name: input.name,
            price: input.price
        }

        const result = await useCase.execute(input)


        expect(result).toEqual(output)

    })
})