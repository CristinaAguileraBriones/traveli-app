const express = require("express");
const router = express.Router();

const Reserva = require("../models/reserva");

const { verifyToken} = require("../middlewares/auth.middlewares.js");

// GET todas las reservas
router.get("/", async (req, res, next) => {
  try {
    const response = await Reserva.find();
    res.status(200).json(response);  // Cambiado a 200 (OK)
  } catch (error) {
    next(error);
  }
});

// GET detalles de una reserva específica por ID
router.get("/:reservaId", async (req, res, next) => {
  try {
    const response = await Reserva.findById(req.params.reservaId);
    if (!response) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// POST nueva reserva
router.post("/addReserva", verifyToken, async (req, res, next) => {
  try {
    const response = await Reserva.create({
      guestName: req.body.guestName,
      userId: req.payload._id,  // Tomar el ID del usuario autenticado
      image: req.body.image,
      description: req.body.description,
      phone: req.body.phone,
      hotelName: req.body.hotelName,
      address: req.body.address,
      roomNumber: req.body.roomNumber,
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
router.delete("/:reservaId", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await Reserva.findByIdAndDelete(req.params.reservaId);
    if (!response) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
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
        image: req.body.image,
        description: req.body.description,
        phone: req.body.phone,
        hotelName: req.body.hotelName,
        address: req.body.address,
        roomNumber: req.body.roomNumber,
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

