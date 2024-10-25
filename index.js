require("dotenv").config()
const express = require("express")


//express
const app = express()
const configuration = require("./config")
configuration(app)
//base de datos
require("./db/index.js")



//rutas
const indexRouter = require("./routes/index.routes")
app.use("/api", indexRouter)




//gestor de errores
const errorHandling = require("./error-handlers")
errorHandling(app)

//configuración de puerto
const port = process.env.PORT
app.listen(port, ()=>{
    console.log("Conectado al backend")
})
