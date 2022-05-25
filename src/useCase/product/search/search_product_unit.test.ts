import { ProductFactory } from "../../../Domain/product/factory/product.factory"
import { SearchProduct } from "./SearchProduct.case"
import { OutputSearchProductDTO } from "./search_product.dto"


const product = ProductFactory.create("product1", 2002)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Test search product use case", () => {

    test("should find a product", async () => {

        
        const product = ProductFactory.create("product1", 2002)
        
        const productRepository = MockRepository()
        await productRepository.create(product)

        const useCase = new SearchProduct(productRepository)

        const input = {
            id: product.id
        }

        const output: OutputSearchProductDTO = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await useCase.execute(input)


        expect(result.name).toEqual(output.name)
        expect(result.price).toEqual(output.price)

    })

    test("should not find a product", async () => {

        const productRepository = MockRepository()
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found")
        })
        const useCase = new SearchProduct(productRepository)

        const input = {
            id: "123"
        }

        expect(()=>{
            return useCase.execute(input)
        }).rejects.toThrow("Product not found")

    })

    
})