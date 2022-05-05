import { ProductFactory } from "./product.factory"

describe('Product Factory unit tests', () => {
  
    test("should create a product type A", ()=>{
        const product = ProductFactory.create("a","product1", 10)

        expect(product.id).toBeDefined()
        expect(product.name).toBe("product1")
        expect(product.constructor.name).toBe("Product")
    })

    test("should create a product type B", ()=>{
        const product = ProductFactory.create("b","product2", 10)

        expect(product.id).toBeDefined()
        expect(product.name).toBe("product2")
        expect(product.priceProduct).toBe(20)
        expect(product.constructor.name).toBe("ProductB")
    })

})
