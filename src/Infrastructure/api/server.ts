import { app } from "./express";
import dotenv from "dotenv"

dotenv.config()

const PORT: number = +process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log("server is listening on port "+PORT)
})