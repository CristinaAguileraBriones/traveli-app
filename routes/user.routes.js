const express= require("express");
const router=express.Router();
const {verifyToken} = require("../middleware/auth.middleware")

const User= require("../models/user.model");

//GET todos los usuarios
router.get("/", verifyToken, async (req, res, next)=>{
    try {
        const response = await User.find()
        res.status(200).json(response);
        
    } catch (error) {
        next(error);
    }
});

//GET /api/user/profile perfiles de usuario
router.get("/profile", verifyToken, async(req, res, next) => {
    
    try{
        const { _id, name, password, email, profile_image, favoritos } = req.payload;
    res.status(200).json({
        message: "Datos del usuario",
        user: { _id,  name, password, email, profile_image, favoritos}
    })
}catch(error){
    next(error)
}
})

//GET /api/user/:userId buscar individualmente por id a cada usuario
router.get("/:userId", verifyToken, async (req, res, next)=>{
    try {
        const response = await User.findById(req.params.userId)

        res.status(200).json(response);
        
    } catch (error) {
        next(error);
    }
});
//PUT /api/user/:userId  Actualizar usuario
router.put("/:userId", verifyToken, async(req, res, next)=>{
    try {
        const response= await User.findByIdAndUpdate( req.params.userId, {
            name:req.body.name,
            favoritos: req.body.favoritos,
            profile_image: req.body.profile_image
        }, {new: true});

        res.status(202).json(response);
    } catch (error) {
        next(error)
    }
})
//PATCH /api/profile/name actualizar nombre
router.patch("/profile/username", verifyToken, async (req, res, next) => {
    try {
  
      
      const {name} = req.body;
  
      
      const updatedUser = await User.findByIdAndUpdate(
        req.payload._id,
        {name},
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.status(200).json({
        message: 'Nombre actualizado',
        user: updatedUser
      });
    } catch (error) {
      next(error);
    }
  });
//PATCH /api/profile/email actualizar email
router.patch("/profile/email", verifyToken, async (req, res, next) => {
    try {
  
      const { email} = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        req.payload._id,
        { email},
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.status(200).json({
        message: 'Email actualizado',
        user: updatedUser
      });
    } catch (error) {
      next(error);
    }
  });

// populate(reservasId)

router.get('/reserva/:reservasId', verifyToken, async (req, res, next) => {
    try {
      const { reservaId } = req.params;
        const response = await User.find({reserva: reservaId})
        .populate('favoritos')

        if(response.length === 0) {
          return res.status(404).json({message: 'Este alojamiento aún no se ha añadido a ninguna lista de favoritos'})
        }
     res.status(200).json(response)
    }catch(error) {
      next(error)
    }
  })

  router.post("/profile/favoritos", verifyToken, async (req, res, next) => {
    try {
    
    const {reservasId} =req.body;
    const userId = req.payload._id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { favoritos: reservasId } }, 
        { new: true }
      ).populate('favoritos');
  

      res.status(200).json({favoritos: updatedUser.favoritos });
    }catch (error) {
      console.log(error)
    }
  })




  
module.exports=router;