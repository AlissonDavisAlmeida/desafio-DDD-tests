import { Custumer } from "../../customer/entity/Customer";
import { ValidatorInterface } from "./validator_interface";
import * as yup from "yup"

export class CustomerYupValidator implements ValidatorInterface<Custumer>{

    validate(entity: Custumer): this {
        try {
            yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required")
            }).validateSync({
                id: entity.id,
                name: entity.name
            }, {
                abortEarly: false
            });
            return this
        } catch (errors) {

            const err = errors as yup.ValidationError
            err.errors.forEach(err => {
                entity.notification.addError({
                    context: "customer",
                    message: err
                })
            })
        }
    }

    validateAddress(entity : Custumer){
        try {
            yup.object().shape({
                street: yup.string().required("Street is required"),
                number: yup.number().required("Number is required")
            }).validateSync({
                street: entity.address.street,
                number: entity.address.number
            },{
                abortEarly:false
            })
        } catch (errors) {
            const err = errors as yup.ValidationError
            err.errors.forEach(err => {
               entity.notification.addError({
                   context: "customer",
                   message: err
               })     
            })
        }   

    }

}