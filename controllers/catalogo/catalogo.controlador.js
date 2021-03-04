const { response } = require("express");
var excel = require("xlsx");
const Catalogo = require("../../models/catalogo/catalogo");
var colors = require("colors");
const Tema = require("../../models/catalogo/temas");
const Img = require("../../models/catalogo/uploads");




const crearCatalogo = async (req, res = response) => {
  try {
    const datos = procesarExcel(req.files);

    for (let index = 0; index < datos.length; index++) {
      const element = datos[index].Foto_JPG_800x800_px.toLowerCase().replace(
        /\s+/g,
        ""
      );

     

      const urlImagenCat = await buscandoUrlImgCat(element);
      console.log("url recibida: ", urlImagenCat);

     datos[index].Foto_JPG_800x800_px =urlImagenCat;

      const nuevoCatalogo= new Catalogo(datos[index]);
      console.log("Nuevo catalogo: ", nuevoCatalogo);

    const catalogoGuardado= await nuevoCatalogo.save();
    console.log("Catalogo guardado: ", catalogoGuardado);

    }
    return res.json({ok: true,
    msg: "Excel procesado, individualizado, validado y creado en forma de catálogo"});

  } catch (e) {
    return res.json({
      ok: false,
      msg: "Contacte al administrador",
      error: e,
    });
  }
};


//funciones
function procesarExcel(exc) {
  try {
    const tmp = exc.sampleFile.tempFilePath;
    const ex = excel.readFile(tmp);

    const nombreHoja = ex.SheetNames;
    let datos = excel.utils.sheet_to_json(ex.Sheets[nombreHoja[0]]);
    return datos;
  } catch (e) {
    console.log("error: ", e);
  }
}
async function buscandoUrlImgCat(name) {
  try {
    const name_buscar = name.toLowerCase();
    imagenExistente = await Img.findOne({ name_buscar });

    if (imagenExistente == null) {
      console.log(
        "No se encontrtó imagen para la estampilla '".blue +
          name +
          "', por lo tanto se le asigna una imagen predeterminada".blue
      );
      const imagen_url = "/uploads/imagenes/predeterminadas/estampillas.jpg";
      return imagen_url;
    }
    return imagenExistente.imagen_url;
  } catch (e) {
    console.log(
      "error al consultar imagen de estampilla, comuniquese con el administrador",
      e
    );
  }
}

module.exports = {
  crearCatalogo,
};
