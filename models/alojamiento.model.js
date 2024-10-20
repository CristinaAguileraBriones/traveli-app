const mongoose = require("mongoose");
const { Schema } = mongoose;

const alojamientoSchema = new Schema({
  name: { type: String, required: true },
  image: [{ type: String }], // Array de URLs de imágenes
  description: { type: String, required: true },
  petsAllowed: { type: Boolean, default: false },
  handicapAccessible: { type: Boolean, default: false },
  kitchenAvailable: { type: Boolean, default: false },
  elevatorAvailable: { type: Boolean, default: false },
  poolAvailable: { type: Boolean, default: false },
  isLuxurious: { type: Boolean, default: false },
  address: { type: String, required: true },
  price: { type: Number, required: true }
}, { timestamps: true });

const Alojamiento = mongoose.model("Alojamiento", alojamientoSchema);

module.exports = Alojamiento;