const express= require("express");
const uploadCloud = require('../cloudinary.app')
const router=express.Router();
const {verifyToken} = require("../middleware/auth.middleware")

const User= require("../models/user.model");
const Alojamiento = require("../models/alojamiento.model");

//GET todos los usuarios //FUNCIONA 
router.get("/", verifyToken, async (req, res, next)=>{
    try {
        const response = await User.find()
        res.status(200).json(response);
        
    } catch (error) {
        next(error);
    }
});


router.get("/profile/favoritos", verifyToken, async(req, res, next) => {
  const { _id } = req.payload;

  try {
    const response = await User.findById(_id).populate("favoritos");
    
    res.status(200).json(response)
  }
  catch(error){
  next(error)
  }
})



//GET /api/user/profile perfiles de usuario //FUNCIONA
router.get("/profile", verifyToken, async(req, res, next) => {
  const { _id } = req.payload;

  try {
    const response = await User.findById(_id);
    
    res.status(200).json(response)
  }
  catch(error){
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
router.put("/:userId", verifyToken, uploadCloud.single('profile_image'), async(req, res, next)=>{
    try {

        let profile_image = req.file ? req.file.path : req.body.profile_image;
        const response= await User.findByIdAndUpdate( req.params.userId, {
            name:req.body.name,
            email: req.body.email,
            favoritos: req.body.favoritos,
            profile_image: profile_image,
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

  router.post("/profile/favoritos/:alojamientoId", verifyToken, async (req,res,next) =>{

    try {

      const userId = req.userId;
      const {alojamientoId} = req.params

      const alojamiento = await Alojamiento.findById(alojamientoId)
      
      if(!alojamiento){
        return res.status(400).json({message: "Alojamiento ya se encuentra en lista de favoritos"})
      }
      
      const user = await User.findById(userId);
      
      if(user.favoritos.includes(alojamientoId)){
        return res.status(400).json({message: "El alojamiento ya se encuentra en su lista de favoritos"})
      }

      user.favoritos.push(alojamiento);
      
      
      await user.save();
      
      res.status(200).json({message: "Alojamiento agregado a favoritos"})

    } catch (error) {
      next(error);
    }
  })


  //Actualizar lista de favoritos
  router.put("/profile/favoritos", verifyToken, async (req, res, next) => {
    try {
    
    const {alojamientoId} =req.body;
    const userId = req.userId;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { favoritos: alojamientoId } }, 
        { new: true }
      ).populate('favoritos');
  

      res.status(200).json({favoritos: updatedUser.favoritos });
    }catch (error) {
      console.log(error)
    }
  });

  //Eliminar de favoritos

  router.delete("/profile/favoritos/:alojamientoId", verifyToken, async (req,res,next) =>{
    try {

      const {alojamientoId} = req.params
      const userId = req.userId
  console.log(alojamientoId)
  console.log(userId)
      const deleteFavorito = await User.findByIdAndUpdate(
        userId,
        { $pull: { favoritos: alojamientoId } }, 
        { new: true }
      ) .populate('favoritos');

      if(!deleteFavorito){
        return res.status(404).json({message: "Usuario no encontrado"})
      }
      

      res.status(200).json({ message: "Actualización de lista de favoritos",favoritos: deleteFavorito.favoritos }); // Responder con la lista actualizada de favoritos


    } catch (error) {
      next(error);
      console.log(error);
      
    }
  })




  
module.exports=router;