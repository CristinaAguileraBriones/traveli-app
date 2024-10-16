const mongoose = require("mongoose")

const reservaSchema = new mongoose.Schema({

    guestName: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: {type: String, required: true},
    phone: {type: String, required: true},
    roomNumber: {type: Number, required: true},
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Reserva = mongoose.model("Reserva", reservaSchema)

module.exports = Reserva