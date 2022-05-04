import { RepositoryInterface } from "../../@shared/repository/repository.interface";
import { Custumer } from "../entity/Customer";


export interface CustomerRepositoryInterface extends RepositoryInterface<Custumer>  {}