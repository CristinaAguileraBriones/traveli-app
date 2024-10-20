const mongoose = require("mongoose")

const reservaSchema = new mongoose.Schema({

    guestName: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    alojamiento: { type: mongoose.Schema.Types.ObjectId, ref: 'Alojamiento', required: true }, // Referencia al alojamiento
    //alojamiento -> image: {type: String},
    // alojamiento -> description: {type: String, required: true},
    //alojamiento -> hotelName: {type: String, required: true},
    //alojamiento -> address: {type: String, required: true},
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true },
    
})

const Reserva = mongoose.model("Reserva", reservaSchema)

module.exports = Reserva