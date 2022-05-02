import { RepositoryInterface } from "../repository.interface";
import { Custumer } from "../../entities/Customer";


export interface CustomerRepositoryInterface extends RepositoryInterface<Custumer>  {}