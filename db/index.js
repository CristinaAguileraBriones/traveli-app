const mongoose = require("mongoose")
const fs = require("fs") // esto es el file system
const path = require("path")
const Alojamiento = require('../models/alojamiento.model')

//conexión a la base de datos

mongoose
.connect("mongodb://127.0.0.1:27017/traveli-bbdd")
    .then(()=>{
        console.log("Conectado a base de datos con alojamientos")
        const cargarAlojamientos = async () => {
          try {

            const alojamientosPath = path.join(__dirname, "../alojamientos.json")
            const data = fs.readFileSync(alojamientosPath, 'utf-8');
            const alojamientos = JSON.parse(data); // Conversor de JSON a un objeto de JavaScript 
            
          } catch (err) {
            console.error('Error al cargar alojamientos', err);
            mongoose.connection.close();
          }
        };
        cargarAlojamientos();
    })
.catch((error)=>{
    console.log(error)
})


// Leer el archivo alojamientos.json


