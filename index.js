require("dotenv").config()
const axios = require('axios');
const express = require("express")
const morgan = require("morgan")
const cors = require("cors") //falta iniciar cors
const mongoose = require("mongoose")

// //app.use(cors({
//     origin: "*"
// }))

//conexión a la base de datos
mongoose.connect("mongodb://127.0.0.1:27017/traveli-bbdd")
    .then(()=>{
        console.log("Conectado a base de datos")
    })
.catch((error)=>{
    console.log(error)
})



const app = express()

//middlewares
app.use(morgan("dev"))
app.use(express.json()) //para poder recibir de clientes objetos en json
app.use(express.static("public"))
app.use(express.urlencoded({extended: false})) //reconocer llamadas

//ruta de prueba
app.get("/", (req, res)=>{
    
    res.send("Esto es una prueba, servidor express arrancando")
})

//rutas de esquema  para bd : USUARIOS
//IMPORTAR MODELO
const User=require("./models/user.model.js")
const Reserva=require("./models/reserva.model.js")
//CRUD
app.post("/user", (req, res)=>{

    //acceso a la base de datos 
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

//buscar detalles de USER ME FALTA PROBAR ESTA RUTA EN POSTMAN
app.get("/user/:userId", async (req, res)=>{

    try {

        const response = User.findById(re.params.userId)
        res.json(response)
        
    } catch (error) {
        console.log(error)
    }
    
})


//IMPLEMENTACION DE LA API EXTERNA

const getToken = async () => {
    try {
      const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', {
        grant_type: 'client_credentials',
        client_id: process.env.API_KEY,
        client_secret: process.env.API_SECRET
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });


      
      return response.data.access_token;  // Devuelve el token
   
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

//   getToken().then(token => {
//     console.log('Token obtenido correctamente:', token);
//   }).catch(error => {
//     console.error('Error al obtener el token:', error);
//   });






//configuración de puerto
const port = process.env.PORT
app.listen(port, ()=>{
    console.log("Conectado al backend")
})
