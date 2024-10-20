const { Timestamp } = require("bson")
const mongoose = require("mongoose")
const { Schema, model } = mongoose // es necesario esto habiendo importado todo mongoose?

//creacion de esquema
const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, "el nombre es obligatorio"], unique: true},
    password: {type: String, required: [true, "la contraseña es obligatoria"]},
    email: {type: String, required: [true, "El email es obligatorio"], unique: true, lowercase: true, trim: true},
    profile_image: {type:String},
    favoritos: [{type: Schema.Types.ObjectId, ref: 'Reserva'}]},

    {timestamps: true}
)
//creacion de modelo
const User = mongoose.model("User", userSchema)

module.exports = User