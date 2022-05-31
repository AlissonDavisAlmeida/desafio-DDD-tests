import { ProductYupValidator } from "../../@shared/validator/product_yup_validator";
import { ValidatorInterface } from "../../@shared/validator/validator_interface";
import { Product } from "../entity/Product";

export class ProductValidatorFactory {

    static create():ValidatorInterface<Product>{
        return new ProductYupValidator()
    }
}