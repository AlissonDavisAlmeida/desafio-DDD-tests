import { Product } from "../entity/Product"


describe("Product unit tests",()=>{

    test('Should throw Error when id, name or price is invalid', () => {


        expect(()=>{

            const product = new Product("", "Produto1", 100)

        }).toThrow("product: Id is required")


        expect(()=>{
            const product = new Product("12", "", -1)
        }).toThrowError("product: Name is required")

    })

    test("should throw all errors when id, name and price are invalid", () => {

        expect(()=>{
            const product = new Product("","", -1)
        }).toThrowError("product: Id is required,product: Name is required")
    })


})