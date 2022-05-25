import { ProductFactory } from "../../../Domain/product/factory/product.factory";
import { ProductRepositoryInterface } from "../../../Domain/product/repository/product_repository.interface";
import { InputCreateProduct, OutputCreateProduct } from "./create_product.dto";


export class ProductCreate{

    #productRepository: ProductRepositoryInterface

    constructor(productRepository: ProductRepositoryInterface){
        this.#productRepository = productRepository;
    }

    async execute(input: InputCreateProduct): Promise<OutputCreateProduct>{

        if(input.name.length === 0){
            throw Error("Name is required")
        }
        const product = ProductFactory.create( input.name, input.price)
        
        await this.#productRepository.create(product)

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}