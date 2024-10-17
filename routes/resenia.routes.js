//importar modelo

//get recuperar las reseñas asociadas a un alojamiento

router.get("/resenia/:hotelId", async()=>{

    try {
        const response = Resenia.find({alojamiento: req.params.hotelId})
    } catch (error) {
        
    }
})
//POST crear nueva reseña
//put modificar id de la reseña a modificar
//delete