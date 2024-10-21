function configuration(app){

const express = require("express")
const morgan = require("morgan")
const cors = require("cors") 


//middlewares
app.use(morgan("dev"))
app.use(express.json()) //para poder recibir de clientes objetos en json
app.use(express.static("public"))
app.use(express.urlencoded({extended: false})) //reconocer llamadas

app.use(cors({
    origin: process.env.ORIGIN || "http://localhost:5173"
    //puerto de mi proyecto
  }))

  }

  module.exports = configuration