import { Product } from "../../entities/Product";
import { RepositoryInterface } from "../repository.interface";

export interface ProductRepositoryInterface extends RepositoryInterface<Product>  {}