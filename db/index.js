const mongoose = require("mongoose")
const fs = require("fs") // esto es el file system
const Alojamiento = require('../models/alojamiento.model')
//conexión a la base de datos
mongoose.connect("mongodb://127.0.0.1:27017/traveli-bbdd")
    .then(()=>{
        console.log("Conectado a base de datos con alojamientos")
        cargarAlojamientos();
    })
.catch((error)=>{
    console.log(error)
})


// Leer el archivo alojamientos.json
const cargarAlojamientos = async () => {
  try {
    const data = fs.readFileSync("../traveli-app/alojamientos.json", 'utf-8'); 
    const alojamientos = JSON.parse(data); // Conversor de JSON a un objeto de JavaScript

    // Insertar los datos en la base de datos
    await Alojamiento.insertMany(alojamientos);
    console.log('Alojamientos añadidos a la base de datos');
    
    mongoose.connection.close(); // Cerrar la conexión una vez que se insertan los datos
  } catch (err) {
    console.error('Error al cargar alojamientos', err);
    mongoose.connection.close();
  }
};

