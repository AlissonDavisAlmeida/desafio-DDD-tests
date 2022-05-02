import { Product } from "../entities/Product"
import { ProductService } from "./ProductService.service"


describe('Product Service Unit Test', () => {


    test("Should change the price of all products", () => {

        const products = []

        const product1 = new Product("p1", "sabão", 3)
        const product2 = new Product("p2", "escova dental", 2)
        products.push(product1, product2)

        ProductService.increasePrice(products, 100)

        expect(product1.price).toEqual(6)
        expect(product2.price).toEqual(4)

    })

})