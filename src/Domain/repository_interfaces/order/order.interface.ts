import { Order } from "../../entities/Order";
import { RepositoryInterface } from "../repository.interface";

export interface OrderRepositoryInterface extends RepositoryInterface<Order>  {}