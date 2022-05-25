import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../customer/sequelize/model/customer-model';
import { ProductModel } from '../product/sequelize/model/product-model';
import { customerRoute } from './routes/customer_router';
import { productRouter } from './routes/product_router';

export const app: Express = express();

app.use(express.json())

app.use("/customers",customerRoute)
app.use("/products", productRouter)

export let sequelize: Sequelize

const setupDB = async ()=>{
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    })
    sequelize.addModels([CustomerModel, ProductModel])
    await sequelize.sync()
}
setupDB()
