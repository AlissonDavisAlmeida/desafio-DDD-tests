import { CustomerYupValidator } from "../../@shared/validator/customer_yup_validator";
import { ValidatorInterface } from "../../@shared/validator/validator_interface";
import { Custumer } from "../entity/Customer";

export class CustomerValidatorFactory {

    static create(): ValidatorInterface<Custumer>{
        return new CustomerYupValidator()
    }
}