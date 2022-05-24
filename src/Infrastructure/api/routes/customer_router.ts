import { Router, Request, Response } from "express";
import { CustomerCreateUseCase } from "../../../useCase/customer/create/CreateCustomer.case";
import { CustomerRepository } from "../../customer/repository/customer-repository";

export const customerRoute = Router()


customerRoute.post("/", async (req: Request, res: Response) => {

    const { customer } = req.body
    const customerRepository = new CustomerRepository()
    const useCase = new CustomerCreateUseCase(customerRepository)
    try {

        const outputCustomer = await useCase.execute({
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number
            }
        })

        res.status(200).json(outputCustomer)
    } catch (err) {
        res.status(500).json({
            message: "Error occurred while create a customer"
        })
    }
})
