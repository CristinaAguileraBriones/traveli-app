function errorHandling(app){
    app.use((req, res)=>{
        res.status(404).json({errorMessage: "Esta ruta no existe :("})
    })
    
    app.use((error, req, res, next)=>{
        res.status(500).json({errorMessage: "Problemas de servidor"})
    })

}

module.exports = errorHandling

