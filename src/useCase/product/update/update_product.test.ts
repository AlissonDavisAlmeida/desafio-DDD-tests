import { ProductFactory } from "../../../Domain/product/factory/product.factory"
import { ProductUpdate } from "./ProductUpdate.case"
import { InputUpdateProduct } from "./update_product.dto"


describe('Unit test to update product', () => {

    const product = ProductFactory.create("product1", 199)

    const input: InputUpdateProduct = {
        id: product.id,
        name: "product1",
        price: 100
    }

    const MockRepository = () => ({
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    })

    test("should update product",async () => {

        const productRepository = MockRepository()

        const productCase = new ProductUpdate(productRepository)
        

        const output = await productCase.execute(input)

        expect(output).toEqual(input)

    })

    test("should throw an error when updating a empty product", async () => {

        const productRepository = MockRepository()

        const productCase = new ProductUpdate(productRepository)
        input.id = null
        await expect(productCase.execute(input)).rejects.toThrowError("Product not found")
    })
})