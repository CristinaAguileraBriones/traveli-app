const mongoose = require("mongoose")

const reseniaSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: {type: String, required: true},
    rating: {type: Number}
})

const Resenia = mongoose.model("Resenia", reseniaSchema)

module.exports= Resenia