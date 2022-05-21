import { Sequelize } from "sequelize-typescript"
import { ProductFactory } from "../../../Domain/product/factory/product.factory"
import { ProductRepository } from "../../../Infrastructure/product/repository/product-repository"
import { ProductModel } from "../../../Infrastructure/product/sequelize/model/product-model"
import { SearchProduct } from "./SearchProduct.case"
import { OutputSearchProductDTO } from "./search_product.dto"



describe("Test search product use case", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    test("should find a product", async ()=>{

        
        const product = ProductFactory.create("product1", 20)
        
        const productRepository = new ProductRepository()
        
        await productRepository.create(product)
        
        const useCase = new SearchProduct(productRepository)
        
        const input ={
            id: product.id
        }    

        const output: OutputSearchProductDTO = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await useCase.execute(input)


        expect(result).toEqual(output)

    })
})