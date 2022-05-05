import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../Domain/product/entity/Product";
import { ProductRepositoryInterface } from "../../../Domain/product/repository/product_repository.interface";
import { ProductModel } from "../sequelize/model/product-model";


export class ProductRepository implements ProductRepositoryInterface {
   


    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        })
    }

    async update(entity: Product): Promise<void> {

        await ProductModel.update(
            {name : entity.name, price: entity.price},
            {
                where:{id : entity.id}
            }
        )
    }

    async find(id: string): Promise<Product> {

        const productModel = await ProductModel.findOne({where:{id}})

        const product = new Product(productModel.id, productModel.name, productModel.price)

        return product

    }

    async findAll(): Promise<Product[]> {
        
        const productsModel = await ProductModel.findAll()

        const products = productsModel.map( productModel => (
            new Product(productModel.id, productModel.name, productModel.price)
        ))

        return products
        
    }

}