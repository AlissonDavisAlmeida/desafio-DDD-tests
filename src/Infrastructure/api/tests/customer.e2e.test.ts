import { app, sequelize } from "../express"
import request from "supertest"


describe("E2E tests for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    test("should create a customer", async () => {

        const response = await request(app)
            .post("/customers")
            .send({
                customer: {
                    name: "Alisson",
                    address: {
                        street: "Av José",
                        number: 541
                    }
                }
            })


        expect(response.status).toEqual(200)
        expect(response.body).toEqual(
            {

                id: expect.any(String),
                name: "Alisson",
                address: {
                    street: "Av José",
                    number: 541
                }

            }
        )
    })

    test("should not create a customer", async () => {
        const response = await request(app).post("/customers")
            .send({
                customer: {
                    nom: "Alisson",
                    address: {
                        street: "Av José",
                        number: 541
                    }
                }
            })

        expect(response.status).toBe(500)

    })

    test("should list all customers", async () => {
        const response = await request(app)
        .post("/customers")
        .send({
            customer: {
                name: "Alisson",
                address: {
                    street: "Av José",
                    number: 541
                }
            }
        })

        expect(response.status).toEqual(200)
       
        const response2 = await request(app)
        .post("/customers")
        .send({
            customer: {
                name: "Apolo",
                address: {
                    street: "Av José Ayrton",
                    number: 542
                }
            }
        })

        expect(response2.status).toEqual(200)

        const listResponse = await request(app).get("/customers").send()

        expect(listResponse.status).toEqual(200)
        expect(listResponse.body.customers.length).toEqual(2)

        const customer = listResponse.body.customers[0]
        expect(customer.name).toEqual("Alisson")

        const customer2 = listResponse.body.customers[1]
        expect(customer2.name).toEqual("Apolo")
    })

})