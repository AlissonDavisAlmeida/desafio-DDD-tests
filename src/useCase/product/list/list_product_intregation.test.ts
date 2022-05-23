import { Sequelize } from "sequelize-typescript"
import { Product } from "../../../Domain/product/entity/Product"
import { ProductFactory } from "../../../Domain/product/factory/product.factory"
import { ProductRepository } from "../../../Infrastructure/product/repository/product-repository"
import { ProductModel } from "../../../Infrastructure/product/sequelize/model/product-model"
import { ListProducts } from "./ListProduct.case"
import { InputListProduct } from "./list_product.dto"




describe("Test list product use case", () => {

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

    test("should list products", async ()=>{

        const product1 = new Product("12", "product1", 100)
        const product2 = ProductFactory.create("product2",200)
        
        const productRepository = new ProductRepository()
        await productRepository.create(product1)
        await productRepository.create(product2)
        
        const useCase = new ListProducts(productRepository)
        
        const input: InputListProduct ={
            input:{}
        }    

        
        const output = await useCase.execute(input)


        expect(output.products.length).toBe(2)
        expect(output.products[0].id).toBe(product1.id)
        expect(output.products[0].name).toBe(product1.name)
        
        expect(output.products[1].id).toBe(product2.id)
        expect(output.products[1].name).toBe(product2.name)

    })
})