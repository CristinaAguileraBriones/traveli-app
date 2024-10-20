const express = require("express")
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()

const {verifyToken}= require("../middleware/auth.middleware")

// POST "/api/auth/signup" : crea al usuario con sus datos
router.post("/signup", async (req, res, next) => {
  // Validaciones de backend
  const { name, password, email } = req.body;

  // Campos obligatorios
  if (!email || !name || !password) {
    res.status(400).json({ message: "Estos campos son requeridos" })
    return
  }

  // Requerimientos de contraseña
  const passwordSecurity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/gm
  if (!passwordSecurity.test(password)) {
    res
      .status(400)
      .json({
        message:
          "La contraseña debe tener al menos, una mayúscula, una minúscula, un número y entre 8 y 16 caracteres",
      })
    return
  }

  // Estructura de email
  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm
  if (!emailFormat.test(email)) {
    res.status(400).json({ message: "El formato del correo electrónico es inválido" })
    return
  }

  try {
    //Antes de crear al usuario hay que buscar a otro usuario con los mismos datos
    const foundUser = await User.findOne({email: email})
    if(foundUser){
        res.status(400).json({ message: "Usuario registrado con ese email" })
    return
    }
    //encriptar la contraseña
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)


    // Crear el usuario en la base de datos
    await User.create({
      name,
      password: hashPassword,
      email,
    })

    // Respuesta exitosa
    res.status(201).json({ message: "Usuario creado exitosamente" })
  } catch (error) {
    next(error) // Enviar el error al middleware de manejo de errores
  }
})

// POST "/api/auth/login" : verifica que ese usuario existe y lo deja entrar si el token es correcto
router.post("/login", async (req, res, next) => {
    const { password, email } = req.body
    console.log(email, password)

    // Validar que todos los campos tengan información
    if (!password || !email) {
        res.status(400).json({ message: "Todos los campos son requeridos" })
        return
    }

    let foundUser;  // Declarar foundUser fuera del try

    try {
        // Buscar si el usuario existe en la base de datos
        foundUser = await User.findOne({ email: email })

        // Agregar un log para verificar si se encuentra el usuario
        console.log("Usuario encontrado:", foundUser);

        if (!foundUser) {
            // Si no se encuentra el usuario, detener el flujo y responder
            res.status(400).json({ message: "El usuario no existe, verifica el correo electrónico que has introducido" });
            return
        }

        // Validar contraseña
        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Contraseña incorrecta" })
            return
        }

    } catch (error) {
        console.error("Error en la búsqueda de usuario o validación:", error)
        next(error)
        return
    }

    // Usuario autenticado -> entregar token
    try {
        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
        }

        console.log("Payload del token:", payload);

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "7d",
        })

        res.status(200).json({ authToken: authToken })
    } catch (error) {
        console.error("Error generando el token:", error)
        next(error);
    }
})

//GET verify
//protegiendo la ruta con un middleware
router.get("/verify", verifyToken, (req, res)=>{

    console.log(req.payload)

    res.status(200).json(req.payload)

})







module.exports = router