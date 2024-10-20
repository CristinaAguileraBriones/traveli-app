require("dotenv").config()
const axios = require('axios');
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




//gestor de errores
const errorHandling = require("./error-handlers")
errorHandling(app)

//configuración de puerto
const port = process.env.PORT
app.listen(port, ()=>{
    console.log("Conectado al backend")
})
