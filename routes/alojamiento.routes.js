const express = require('express');
const Alojamiento = require('../models/alojamiento.model'); 
const router = express.Router();

// GET "/api/alojamiento" - Obtener todos los alojamientos FUNCIONA
router.get('/', async (req, res, next) => {
  try {
    const alojamientos = await Alojamiento.find(); 
    res.status(200).json(alojamientos); 
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los alojamientos', error });
    console.log(error);
  }
});

// GET "/api/alojamiento/:id" - Obtener un alojamiento por ID FUNCIONA
router.get('/:id', async (req, res, next) => { 
  const { id } = req.params; 
  try {
    const alojamiento = await Alojamiento.findById(id); 

    if (!alojamiento) {
      return res.status(404).json({ message: 'Alojamiento no encontrado' }); 
    }

    res.status(200).json(alojamiento); 
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el alojamiento', error });
    console.log(error);
  }
});

module.exports = router;