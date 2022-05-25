import { Router, Request, Response } from "express";
import { CustomerCreateUseCase } from "../../../useCase/customer/create/CreateCustomer.case";
import { ListCustomer } from "../../../useCase/customer/list/ListCustomer.case";
import { CustomerRepository } from "../../customer/repository/customer-repository";

export const customerRoute = Router()


customerRoute.post("/", async (req: Request, res: Response) => {

    const { customer } = req.body
    const customerRepository = new CustomerRepository()
    const useCase = new CustomerCreateUseCase(customerRepository)
    try {
        console.log(customer)
        const outputCustomer = await useCase.execute({
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number
            }
        })

        res.status(200).json(outputCustomer)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Error occurred while create a customer"
        })
    }
})

customerRoute.get("/", async (req: Request, res: Response) =>{
    const customerRepository = new CustomerRepository()
    const useCase = new ListCustomer(customerRepository)

    try{
        const listCustomer = await useCase.execute()
        
        res.status(200).json({
            customers: listCustomer.customers
        })
    }catch(err){
        res.status(500).json({
            message: "Error occurred while getting customers"
        })
    }
})
