const express = require('express');
const Reserva = require('../models/reserva.model'); 
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware'); 

// GET "/api/reservas" - Obtener las reservas del usuario autenticado
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const userId = req.payload._id; 

    const reservas = await Reserva.find({ userId }).populate('alojamiento', 'image description hotelName address');

    res.status(200).json(reservas); 
  } catch (error) {
    next(error);
  }
});


// POST nueva reserva

router.post("/addReserva", verifyToken, async (req, res, next) => {
  try {
    console.log(req.payload);
    const response = await Reserva.create({
      guestName: req.body.guestName,
      userId: req.payload._id,  
      alojamiento: req.body.alojamiento,  // el ID del alojamiento
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
      numberOfGuests: req.body.numberOfGuests
    });

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE eliminar una reserva específica
router.delete("/:reservaId", verifyToken, async (req, res, next) => {
  try {
  
    const reserva = await Reserva.findById(req.params.reservaId);

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    if (reserva.userId.toString() !== req.payload._id) {
      return res.status(403).json({ message: "No tienes permiso para eliminar esta reserva" });
    }

    // Eliminar la reserva
    await Reserva.findByIdAndDelete(req.params.reservaId);
    
    res.status(200).json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    next(error);
  }
});

// PUT actualizar una reserva específica
router.put("/:reservaId/edit", verifyToken, async (req, res, next) => {
  try {
    const response = await Reserva.findByIdAndUpdate(
      req.params.reservaId,
      {
        guestName: req.body.guestName,
        userId: req.payload._id,  
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        numberOfGuests: req.body.numberOfGuests
      },
      { new: true }
    );
    if (!response) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

