import { ProductCreate } from "./CreateProduct.case"
import { InputCreateProduct, OutputCreateProduct } from "./create_product.dto"


describe('Test create Product', () => {

    const input: InputCreateProduct = {
        name: 'product1',
        price: 100
    }

    const MockRepository = () => {
        return {
            find: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            create: jest.fn()
        }
    }


    test("should create a product", async () => {

        const productRepository = MockRepository()
        const productCreateUserCase = new ProductCreate(productRepository)

        const output: OutputCreateProduct = {
            id: expect.any(String),
            name: input.name,
            price: input.price,
        }

        const result = await productCreateUserCase.execute(input)

        expect(result).toEqual(output)

    })

    test("should throw an error when name is missing", async () => {
        
        const productRepository = MockRepository()
        const productCreateUserCase = new ProductCreate(productRepository)

        const output: OutputCreateProduct = {
            id: expect.any(String),
            name: input.name,
            price: input.price
        }

        input.name = ""

        

        await expect(productCreateUserCase.execute(input)).rejects.toThrowError("Name is required")
    })

})