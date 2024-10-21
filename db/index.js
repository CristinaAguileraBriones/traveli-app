const mongoose = require("mongoose")
//conexión a la base de datos

mongoose
.connect("mongodb://127.0.0.1:27017/traveli-bbdd")
    .then(()=>{
        console.log("Conectado a base de datos con alojamientos")
        
    })
.catch((error)=>{
    console.log(error)
})





