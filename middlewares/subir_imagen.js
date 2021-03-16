const { response } = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');
const crearImagen =  (req, ruta) => {
  const pathParaRetornar = new Object();
  pathParaRetornar.error = "";
  pathParaRetornar.url = "";

  try {

    const { sampleFile } = req.files;
    console.log("Sample File ->", sampleFile);

    //Asignando nombre único a la imagen:
    let now = new Date();
    let srtFecha = Date.parse(now);

    /**Se crea un nombre unico para la imagen, el cual es practicamente imposible que se repita
     * porque se maneja la fecha actual, con hora, minutos y segundos para hacer parte delnombre,
     * tambien se usa iid que genera un nombre casi imposible que se repita y sele adiciona
     * el nombre de la imagen antes de subirla, haciendo que sea practicamente imposible que exista un nombre igual
    */
    const nombreImagen = srtFecha + "_" + uuidv4() + "_" + sampleFile.name;
    console.log("Nombre único Imagen ->", nombreImagen);

    const uploadPath = path.join(
      __dirname,
      "../uploads/imagenes/" + ruta + "/" + nombreImagen
    );

    console.log("paht", uploadPath);
  sampleFile.mv(uploadPath, (err) => {
      console.log("errror->>>>", err);
      if (err) {
        console.log("No se ha podido guardar->", err);
         pathParaRetornar.error = err;
      } else {
        console.log("Guardada correctamente");
        pathParaRetornar.url = "/imagenes/" + ruta + "/" + nombreImagen; 
         
      
      }
    });

    pathParaRetornar.url = "/imagenes/" + ruta + "/" + nombreImagen; 

    return pathParaRetornar;


  } catch (e) {
    console.error("error en catch ->", e);
    pathParaRetornar.error = "Error inesperado en actualizar usuario -> subir_imagen() - cath, comuniquese con el administrador";
    return pathParaRetornar;
  }
};

const eliminarImagenServidor = (urlImgBD) =>{
  const pahtImgServer = path.join(__dirname, "../uploads", urlImgBD );

  console.log("Eliminando imagen servidor", pahtImgServer);
  if(fs.existsSync(pahtImgServer)){
    fs.unlinkSync(pahtImgServer);
    console.log("Imagen eliminada");

  }
}

module.exports = {
  crearImagen,
  eliminarImagenServidor
};
