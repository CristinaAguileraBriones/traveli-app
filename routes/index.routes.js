const router = require("express").Router()


//ruta de prueba
router.get("/", (req, res, next)=>{
    
    res.json("Esto es una prueba, servidor express arrancando")
})


//Usuarios
const userRouter = require("./user.routes.js")
router.use("/user", userRouter)
//Reserva
const reservaRouter = require("./reserva.routes.js")
router.use("/reserva", reservaRouter)
//Resenia
const reseniaRouter = require("./resenia.routes.js")
router.use("/resenia", reseniaRouter)
//Alojamientos
const alojamientoRouter = require("./alojamiento.routes.js")
router.use("/alojamiento", alojamientoRouter)

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

//CLUDINARY
const uploadRoutes = require("./cloudinary.routes.js");
router.use("/upload", uploadRoutes);


module.exports = router