import { Sequelize } from "sequelize-typescript"
import { Product } from "../../../Domain/product/entity/Product"
import { ProductModel } from "../../product/sequelize/model/product-model"
import { ProductRepository } from "./product-repository"


describe("Product Repository test", () => {

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


    test("should create a product", async () => {
        
        const productRepository = new ProductRepository()
        const product = new Product("1","product 1",100)

        await productRepository.create(product)

        const productModel = await ProductModel.findOne({where:{id : "1"}})

        expect(productModel.toJSON()).toStrictEqual({
            id : "1",
            name: "product 1",
            price: 100
        })
    })

   
    test("should update a product", async ()=>{

        const productRepository = new ProductRepository()
        const product = new Product("1","product 1",100)

        await productRepository.create(product)

        product.changePrice(200)

        await productRepository.update(product)

        const productModel2 = await ProductModel.findOne({where:{id:"1"}})

        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "product 1",
            price: 200
        })
    })


    test("should find a product", async ()=>{
        const productRepository = new ProductRepository()
        const product = new Product("1","product1", 100)

        await productRepository.create(product)

        const foundProduct = await productRepository.find("1")

        expect(foundProduct).toEqual(new Product(
            product.id,
            product.name,
            product.price
        ))


    })

    test("should find all products", async ()=>{
        const productRepository = new ProductRepository()
        const product = new Product("1", "product1", 100)
        const product2 = new Product("2", "product2", 200)
        const product3 = new Product("3", "product3", 300)

        await productRepository.create(product)
        await productRepository.create(product2)
        await productRepository.create(product3)

        const foundProducts = await productRepository.findAll()
        const products = [product, product2, product3]

        expect(products).toEqual(foundProducts)

    })




    afterEach(async () => {
        await sequelize.close()
    })
})