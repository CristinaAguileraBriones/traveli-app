const express = require("express");
const router = express.Router();
const Resenia = require("../models/resenia.model.js");
const { verifyToken } = require("../middleware/auth.middleware.js");

// GET todas las reseñas
router.get("/", async (req, res, next) => {
  try {
    const response = await Resenia.find()
      .populate("userId", "name")  
      .populate("alojamientoId", "hotelName");  
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// GET una reseña específica por ID
router.get("/:reseniaId", async (req, res, next) => {
  try {
    const response = await Resenia.findById(req.params.reseniaId)
      .populate("userId", "name")  
      .populate("alojamientoId", "hotelName"); 
    if (!response) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// POST nueva reseña
router.post("/addResenia", verifyToken, async (req, res, next) => {
  try {
    const { comment, rating, alojamientoId } = req.body;

    const response = await Resenia.create({
      userId: req.payload._id,  
      comment,
      rating,
      alojamientoId
    });
    
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// PUT actualizar una reseña por ID
router.put("/:reseniaId", verifyToken, async (req, res, next) => {
  try {
    const { comment, rating } = req.body;

    const response = await Resenia.findByIdAndUpdate(
      req.params.reseniaId,
      { comment, rating },
      { new: true }
    ).populate("userId", "name")
      .populate("alojamientoId", "hotelName");

    if (!response) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE eliminar una reseña por ID
router.delete("/:reseniaId", verifyToken, async (req, res, next) => {
  try {
    const resenia = await Resenia.findById(req.params.reseniaId);
    
    if (!Resenia) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

  
    if (Resenia.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "No tienes permiso para eliminar esta reseña" });
    }

    await Resenia.findByIdAndDelete(req.params.reseniaId);
    res.status(200).json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    next(error)
  }
});

module.exports = router