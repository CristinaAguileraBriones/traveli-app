const express = require("express")
const router = express.Router()

//modelos

const User=require("../models/user.model.js")

//Crear usuario
router.post("/", (req, res)=>{

    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    })
    .then(()=>{
        res.send("usuario creado")
    })
    .catch(error=>{
        res.status(500).send("Error al crear el usuario")
    })

   
})
//buscar todos los usuarios completos
router.get("/user/all", async(req, res)=>{

   try {
    const response = await User.find()
    res.json(response)
    
   } catch (error) {
    console.log(error, "No se pueden ver los usuarios creados")
   }
})

//buscar usuario por email
router.get("/user/email", async(req, res)=>{
    try {
      const response = await User.find()
      .select({email: 1})  
    } catch (error) {
        console.log(error, "No se han encontrado los emails de los usuarios")
    }
})
//buscar usuario por nombre ordenado alfabéticamente
router.get("/user/name", async(req, res)=>{
    try {
      const response = await User.find()
      .select({name: 1})
      .sort({name: 1})
    } catch (error) {
        console.log(error, "no se han encontrado los nombres")
    }
})

//busqueda de querys por el usuario
router.get("/search", async(req, res)=>{
    try {
      const response = await User.find(req.query)
    } catch (error) {
        console.log(error, "no se han encontrado los usuarios con los parametros que tu buscabas")
    }
})


//buscar todos los detalles de un usuario 
router.get("/user/:userId", async (req, res)=>{

    try {

        const response = await User.findById(req.params.userId)
        res.json(response)
        
    } catch (error) {
        console.log(error)
    }
    
})

//Borrar a un usuario 

router.delete("/user/:userId", async (req, res)=>{
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.send("usuario borrado")
    } catch (error) {
        console.log(error)
    }
})

//UPDATE
router.put("/user/:userId", async(req, res)=>{

    try {

        const response = await User.findByIdAndUpdate(req.params.userId, {

        name: req.body.name,
        password: req.body.password,
        email: req.body.email

        }, {new: true})

        res.json(response, "Usuario actualizado")
        
    } catch (error) {
        console.log(error, "No se ha actualizado el usuario")
    }

})


module.exports = router