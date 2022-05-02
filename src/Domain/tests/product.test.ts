import { Product } from "../entities/Product"


describe("Product unit tests",()=>{

    test('Should throw Error when id is empty', () => {


        expect(()=>{

            const product = new Product("", "Produto1", 100)

        }).toThrowError("Id is required")

    })


})