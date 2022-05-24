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

})