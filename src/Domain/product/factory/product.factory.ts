import { Product } from "../entity/Product";

export class ProductFactory{
    public static create(name: string, price: number): Product{
                const id = Math.random().toString()
                return new Product(id, name, price)
           
    
}
}