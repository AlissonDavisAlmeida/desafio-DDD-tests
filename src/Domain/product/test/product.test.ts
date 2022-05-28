import { Product } from "../entity/Product"


describe("Product unit tests",()=>{

    test('Should throw Error when id, name or price is invalid', () => {


        expect(()=>{

            const product = new Product("", "Produto1", 100)

        }).toThrowError("product: Id is not validate")


        expect(()=>{
            const product = new Product("12", "", -1)
        }).toThrowError("product: Name cant be empty")

        expect(()=>{
            const product = new Product("sd", "product", 0)
        }).toThrowError("product: Price cant be negative or zero")
    })

    test("should throw all errors when id, name and price are invalid", () => {

        expect(()=>{
            const product = new Product("","", -1)
        }).toThrowError("product: Id is not validate,product: Name cant be empty,product: Price cant be negative or zero")
    })


})