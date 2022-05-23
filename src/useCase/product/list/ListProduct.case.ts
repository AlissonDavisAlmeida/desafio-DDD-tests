import { ProductRepositoryInterface } from "../../../Domain/product/repository/product_repository.interface";
import { InputListProduct, OutputListProduct } from "./list_product.dto";

export class ListProducts{

    #productRepository : ProductRepositoryInterface

    constructor(productRepository : ProductRepositoryInterface){
        this.#productRepository = productRepository;
    }


    async execute(input: InputListProduct): Promise<OutputListProduct>{

        const result = await this.#productRepository.findAll()
        let array = result.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price            
        })) 

        const output : OutputListProduct = {
            products :array
        } 

        return output
    }
 

}