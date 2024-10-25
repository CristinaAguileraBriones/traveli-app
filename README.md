# 🌍 Traveli

¡Ve echándole un vistazo a nuestra app en desarrollo!

## ![imagen](https://github.com/user-attachments/assets/90d41b7c-ce1f-4cef-b937-637cd2f69ae9)

Este proyecto trata de construir una web de reserva de hoteles de una manera sencilla y rápida para tener a tu alcance tu próximo alojamiento perfecto para descansar.

---

### 🖥️ Repositorios
- **Servidor del cliente**: [GitHub](https://github.com/CristinaAguileraBriones/traveli-app-cliente)
- **Servidor Express**: [GitHub](https://github.com/CristinaAguileraBriones/traveli-app)

---

## 🚧 Funcionalidades en construcción
- ✍️ Sistema de reseñas con posibilidad de editar y eliminar
- 🛠️ Administrador de página con posibilidad de publicar más alojamientos

---

## ⚙️ Tecnologías utilizadas
- MongoDB
- React
- Express
- JavaScript
- Bootstrap
- CSS
- Cloudinary

---

## 🗂️ Modelos
La aplicación consta de 4 modelos, los cuales presentamos a continuación:

### 🧑‍🤝‍🧑 User
```javascript
const { Timestamp } = require("bson")
const mongoose = require("mongoose")
const { Schema, model } = mongoose 

const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, "el nombre es obligatorio"], unique: true},
    password: {type: String, required: [true, "la contraseña es obligatoria"]},
    email: {type: String, required: [true, "El email es obligatorio"], unique: true, lowercase: true, trim: true},
    profile_image: {type:String},
    favoritos: [{type: Schema.Types.ObjectId, ref: 'Alojamiento'}]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;


🗓️ Reserva Model
const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
    guestName: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    alojamiento: { type: mongoose.Schema.Types.ObjectId, ref: 'Alojamiento', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true }
});

const Reserva = mongoose.model("Reserva", reservaSchema);

module.exports = Reserva;

📝 Resenia Model
const mongoose = require("mongoose");

const reseniaSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    alojamientoId: { type: mongoose.Schema.Types.ObjectId, ref: "Alojamiento", required: true },
    comment: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5, required: true}
}, { timestamps: true });

const Resenia = mongoose.model("Resenia", reseniaSchema);

module.exports = Resenia;


🏨 Alojamiento Model
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


📂 Rutas de los modelos
🔑 Rutas de usuario:
GET /api/user/
GET /api/user/profile
GET /api/user/:userId
GET /api/user/profile/favoritos
PUT /api/user/:userId
PUT /api/user/profile/favoritos
PATCH /api/user/profile/name
PATCH /api/user/profile/email
POST /api/user/profile/favoritos/:alojamientoId
📆 Rutas de reserva:
GET /api/reservas
POST /api/reserva/addReserva
DELETE /api/reserva/:reservaId
PUT /api/reserva/:reservaId/edit
🌟 Rutas de reseña:
GET /api/resenia
GET /api/resenia/:reseniaId
POST /api/resenia/addResenia
PUT /api/resenia/:reseniaId
DELETE /api/resenia/:reseniaId
🏠 Rutas de alojamiento:
GET /api/alojamiento
GET /api/alojamiento/:id


👥 Colaboradores
Cristina Aguilera
Miguel Ángel Ponte

🌐 Project
Link del deploy: Traveli App

Presentación:

