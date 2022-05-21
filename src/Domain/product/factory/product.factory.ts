import { Product } from "../entity/Product";
import { ProductB } from "../entity/ProductB";

export class ProductFactory{
    public static create(name: string, price: number): Product{

                return new Product("1", name, price)
           
    
}
}