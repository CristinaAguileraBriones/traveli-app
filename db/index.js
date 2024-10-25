const mongoose = require("mongoose")
//conexión a la base de datos

<<<<<<< HEAD
const MONGO_URI =
=======

const MONGO_URI = 
>>>>>>> bc9672b257a60d9281891847769e46629f093b82
process.env.MOGODB_URI || "mongodb://127.0.0.1:27017/traveli-bbdd"
mongoose
.connect(MONGO_URI)
    .then((x)=>{
        const dbName = x.connections[0].name
        console.log(`Conectado a la base de datos: ${dbName}` )
<<<<<<< HEAD
=======
        
>>>>>>> bc9672b257a60d9281891847769e46629f093b82
    })
.catch((error)=>{
    console.log(error)
})





