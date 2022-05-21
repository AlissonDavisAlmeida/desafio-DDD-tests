import { ProductRepositoryInterface } from "../../../Domain/product/repository/product_repository.interface"
import { InputSearchProductDTO, OutputSearchProductDTO } from "./search_product.dto"

export class SearchProduct {

    #productRepository: ProductRepositoryInterface

    constructor(productRepository: ProductRepositoryInterface) {
        this.#productRepository = productRepository
    }



    async execute(input: InputSearchProductDTO): Promise<OutputSearchProductDTO> {

        const product = await this.#productRepository.find(input.id)

        const output: OutputSearchProductDTO = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        return output
    }
}