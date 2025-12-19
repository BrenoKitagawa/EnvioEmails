

export function swaggerOptions(){

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

return swaggerOptions
}