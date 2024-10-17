const { Timestamp } = require("bson")
const mongoose = require("mongoose")

//creacion de esquema
const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, "name is required"], unique: true},
    password: {type: String, required: [true, "password is required"]},
    email: {type: String, required: [true, "email is required"], unique: true, lowercase: true, trim: true}
},
   {timestamp: true} 
)
//creacion de modelo
const User = mongoose.model("User", userSchema)

module.exports = User