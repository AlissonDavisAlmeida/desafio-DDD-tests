import { Router } from "express";
import { ProductCreate } from "../../../useCase/product/create/CreateProduct.case";
import { ListProducts } from "../../../useCase/product/list/ListProduct.case";
import { ProductRepository } from "../../product/repository/product-repository";

export const productRouter = Router()

productRouter.post("/", async (req, res) => {
    const {name, price} = req.body
    const productRepository = new ProductRepository()
    const useCase = new ProductCreate(productRepository)

    try{

        const result = await useCase.execute({name, price})

        res.status(200).json({
            product: result
        })
    }catch(err){
        res.status(500).json({
            message: "Ocurred error creating product"
        })
    }

})

productRouter.get("/", async (req, res) => {
    const productRepository = new ProductRepository()
    const useCase = new ListProducts(productRepository)

    try {
        const result = await useCase.execute({input:{}})

        res.status(200).json({
            products: result.products
        })

    }catch(err){
        res.status(500).json({
            message: "Ocurred error while getting products"
        })
    }

})