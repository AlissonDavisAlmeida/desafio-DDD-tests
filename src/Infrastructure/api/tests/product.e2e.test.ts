import  request  from "supertest";
import { app, sequelize } from "../express";


describe("Test E2E to products routers", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })


    test("should list all products", async () => {

        const response = await request(app).post("/products")
                        .send({
                            name:"product1",
                            price: 100
                        })
        
        expect(response.status).toBe(200)

        const response2 = await request(app).post("/products")
                        .send({
                            name:"product2",
                            price: 300
                        })
        
        expect(response2.status).toBe(200)

        const listproducts = await request(app).get("/products").send()

        expect(listproducts.status).toBe(200)
        expect(listproducts.body.products.length).toBe(2)

        const product1 = listproducts.body.products[0]

        expect(product1.name).toEqual("product1")
        expect(product1.price).toEqual(100)

        const product2 = listproducts.body.products[1]
        expect(product2.name).toEqual("product2")
        expect(product2.price).toEqual(300)
    })
})