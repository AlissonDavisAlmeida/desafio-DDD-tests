import { ProductRepositoryInterface } from "../../../Domain/product/repository/product_repository.interface";
import { InputUpdateProduct, OutputUpdateProduct } from "./update_product.dto";

export class ProductUpdate{


    #productRepository : ProductRepositoryInterface

    constructor(productRepository  : ProductRepositoryInterface){
        this.#productRepository = productRepository;
    }


    async execute(input : InputUpdateProduct): Promise<OutputUpdateProduct>{

        const product = await this.#productRepository.find(input.id)

        if(!product || !input.id){
            throw new Error("Product not found")
        }
        product.changePrice(input.price)
        
        await this.#productRepository.update(product)


        const output: OutputUpdateProduct = {
            id : product.id,
            name: product.name,
            price: product.price
        }

        return output
        
    }

}