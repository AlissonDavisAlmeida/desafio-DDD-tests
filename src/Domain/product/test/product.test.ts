import { Product } from "../entity/Product"


describe("Product unit tests",()=>{

    test('Should throw Error when id is empty', () => {


        expect(()=>{

            const product = new Product("", "Produto1", 100)

        }).toThrowError("product: Id is not validate")

    })


})