const express= require("express");
const router=express.Router();
const {verifyToken} = require("../middleware/auth.middleware")

const User= require("../models/user.model");

//GET todos los usuarios //FUNCIONA 
router.get("/", verifyToken, async (req, res, next)=>{
    try {
        const response = await User.find()
        res.status(200).json(response);
        
    } catch (error) {
        next(error);
    }
});

//GET /api/user/profile perfiles de usuario //FUNCIONA
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

//GET /api/user/:userId buscar individualmente por id a cada usuario //FUNCIONA
router.get("/:userId", verifyToken, async (req, res, next)=>{
    try {
        const response = await User.findById(req.params.userId)

        res.status(200).json(response);
        
    } catch (error) {
        next(error);
    }
});

//PUT /api/user/:userId  Actualizar usuario FUNCIONA
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
//PATCH /api/profile/name actualizar nombre FUNCIONA
router.patch("/profile/name", verifyToken, async (req, res, next) => {
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
//PATCH /api/profile/email actualizar email FUNCIONA
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

// populate buscar los alojamientos favoritos dentro del perfil de usuario FUNCIONA

router.get('/profile/favoritos', verifyToken, async (req, res, next) => {
  try {
  
    const userId = req.userId;
    const user = await User.findById(userId).populate('favoritos');

    if(!user){
      return res.status(400).json({message: "el usuario no existe"})
    }

    if ( user.favoritos.length === 0) {
      return res.status(200).json({ message: 'No has añadido alojamientos a la lista de favoritos.' });
    }

    res.status(200).json(user.favoritos);
  } catch (error) {
    next(error);
  }
});
  //añadir a favoritos






  //Actualizar lista de favoritos
  router.post("/profile/favoritos", verifyToken, async (req, res, next) => {
    try {
    
    const {reservasId} =req.body;
    const userId = req.userId;

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