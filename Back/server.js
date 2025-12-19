import express from "express"
import routes from "./rotas.js"
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./libs/swaggerConfig.js";

const swaggerSpec = swaggerJsdoc(swaggerOptions());

const app = express()
const porta = 3000

//Rota para swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(routes)


app.listen(porta,()=>{
    console.log(`servidor rodando http://localhost:${porta}`)
})
