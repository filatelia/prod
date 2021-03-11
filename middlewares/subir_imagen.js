
const { response } = require("express");
const path = require("path");


const crearImagen =  (file, ruta, res=response) => {

    try {
    const { sampleFile } = file;
    
    const uploadPath = path.join(
      __dirname,
      "../uploads/imagenes/"+ ruta +"/" + sampleFile.name
    );
    
    console.log("paht", uploadPath);
    sampleFile.mv(uploadPath, (err) => {
      if (err) {
        console.log("error:", err);
        return res.status(500).json({
          msg: err,
        });
      }else{
          console.log("Imagen creada correctamente");
      }
    });
    return "../uploads/imagenes/"+ ruta +"/" + sampleFile.name;

} catch (e) {
    return res.json({
        ok: false,
        msg: "Error critico al crear la imagen, comuniquese con el administrador",
        error: e
    });

}

};


module.exports = {
    crearImagen
}