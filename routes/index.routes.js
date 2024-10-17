const express = require("express")
const router = express.Router()
//modelo reserva por utilizar
const Reserva=require("../models/reserva.model.js")

//ruta de prueba
router.get("/", (req, res)=>{
    
    res.send("Esto es una prueba, servidor express arrancando")
})


//Usuarios
const userRouter = require("./user.routes.js")
router.use("/user", userRouter)




module.exports = router