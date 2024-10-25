const mongoose = require("mongoose")
//conexión a la base de datos

const MONGO_URI =
process.env.MOGODB_URI || "mongodb://127.0.0.1:27017/traveli-bbdd"
mongoose
.connect(MONGO_URI)
    .then((x)=>{
        const dbName = x.connections[0].name
        console.log(`Conectado a la base de datos: ${dbName}` )
    })
.catch((error)=>{
    console.log(error)
})





