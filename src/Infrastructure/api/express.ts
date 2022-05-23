import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../customer/sequelize/model/customer-model';

export const app: Express = express();

app.use(express.json())


export let sequelize: Sequelize

const setupDB = async ()=>{
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    })
    sequelize.addModels([CustomerModel])
    await sequelize.sync()
}
setupDB()
