import { ProductFactory } from "../../../Domain/product/factory/product.factory"
import { ListProducts } from "./ListProduct.case"


describe('Unit test for listing products', () => {

    const product1 = ProductFactory.create("product1", 100)
    const customer2 = ProductFactory.create("product2", 3000)

    const MockRepository = () => ({
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, customer2]))
    })

    test("should list a product",async () => { 

        const productRepository = MockRepository()
        const useCase = new ListProducts(productRepository)

        const output = await useCase.execute()

        expect(output.products.length).toBe(2)
        expect(output.products[0].id).toBe(product1.id)
        expect(output.products[0].name).toBe(product1.name)
        
        expect(output.products[1].id).toBe(customer2.id)
        expect(output.products[1].name).toBe(customer2.name)


    })


})