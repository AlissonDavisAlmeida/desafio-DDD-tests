import { Sequelize } from "sequelize-typescript"
import { Product } from "../../../Domain/product/entity/Product"
import { ProductFactory } from "../../../Domain/product/factory/product.factory"
import { ProductRepository } from "../../../Infrastructure/product/repository/product-repository"
import { ProductModel } from "../../../Infrastructure/product/sequelize/model/product-model"
import { ProductUpdate } from "./ProductUpdate.case"
import { InputUpdateProduct } from "./update_product.dto"



describe("Test update product use case", () => {

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

    test("should update product", async ()=>{

        
        const product2 = ProductFactory.create("product2",200)
        
        const productRepository = new ProductRepository()
        await productRepository.create(product2)
        
        const useCase = new ProductUpdate(productRepository)
        
        const input: InputUpdateProduct ={
            id: product2.id,
            name: "new name product",
            price: 400
        }    

        
        const output = await useCase.execute(input)


        expect(output).toEqual(input)
       

    })
})