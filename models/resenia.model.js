const mongoose = require("mongoose")

const reseniaSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    alojamientoId: { type: mongoose.Schema.Types.ObjectId, ref: "Alojamiento", required: true },  // Relación con el Alojamiento
    comment: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5, required: true}
}, { timestamps: true })

const Resenia = mongoose.model("Resenia", reseniaSchema)

module.exports= Resenia