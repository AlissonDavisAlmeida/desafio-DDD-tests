import { Product } from "../../product/entity/Product";
import { ValidatorInterface } from "./validator_interface";
import * as yup from "yup"

export class ProductYupValidator implements ValidatorInterface<Product>{


    validate(entity: Product): this {
        try{

            yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                price: yup.number().required("Price is required")

            }).validateSync({
                id: entity.id,
                name: entity.name,
                price: entity.price
            },{
                abortEarly:false
            })

            return this
        }catch(errors){
            const err = errors as yup.ValidationError
            err.errors.forEach(e=>{
                entity.notification.addError({
                    context:"product",
                    message: e
                })
            }) 
        }
    }
   

}