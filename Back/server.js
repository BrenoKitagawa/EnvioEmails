import express from "express"
import routes from "./rotas.js"
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Send Mail API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./rotas.js"],
}
const swaggerSpec = swaggerJsdoc(swaggerOptions);


const app = express()
const porta = 3000

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())

app.use(routes)


app.listen(porta,()=>{
    console.log(`servidor rodando http://localhost:${porta}`)
})
