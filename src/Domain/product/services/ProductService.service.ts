import { Product } from "../product/entity/Product";

export class ProductService {


    public static increasePrice(products: Product[], percentage: number): void {

        products.forEach(product =>{
            product.changePrice(product.price * (1 + (percentage/100)))
        })

    }

}