const Temas = require("../models/catalogo/temas");
const Img = require("../models/catalogo/uploads");
const colors = require('colors');
const buscarTema = async (name_buscar) => {
  var temaEncontrado = null;
  try {
    var name = name_buscar.toLowerCase().replace(/\s+/g, "");

    temaEncontrado = await Temas.findOne({ name }, { _id: 1 });
    if (temaEncontrado != null) {
      return temaEncontrado;
    } else {
      return (temaEncontrado = null);
    }
  } catch (e) {
    return (temaEncontrado = null);
  }
};

const crearTema = async (name) => {
  var paraRetornar;

  try {
    if (name && name != null) {
      const existeTema = await buscarTema(name);

      if (existeTema != null) {
        return (paraRetornar = existeTema);
      } else {
        var objTemaNuevo = new Object();
        objTemaNuevo.name = name;

        //Buscando imagen para asignar
        const imagen = await buscandoUrlImgTema(name);
        objTemaNuevo.imagen = imagen;
        objTemaNuevo.ParaBuscar = name.toLowerCase().replace(/\s+/g, "");

        const temaNuevo = new Temas(objTemaNuevo);
        const temaGuardado = await temaNuevo.save();
        console.log("tema guardado: ", temaGuardado._id);
        return (paraRetornar = temaGuardado._id);
      }
    } else {
      return (paraRetornar = false);
    }
  } catch (e) {
    console.log("catch error");
  }
};
async function buscandoUrlImgTema(name) {
  try {
    const name_buscar = name.toLowerCase().replace(/\s+/g, "");
    imagenExistente = await Img.findOne({ name_buscar });

    if (imagenExistente == null) {
      console.log(
        colors.blue(
          "No se encontrtó imagen para el tema '" +
            name +
            "', pro lo tanto se le asigna una imagen predeterminada"
        )
      );
      const imagen_url = "/imagenes/predeterminadas/temas.png";
      return imagen_url;
    }
    return imagenExistente.imagen_url;
  } catch (e) {
    console.log(
      "error al consultar imagen de tema, comuniquese con el administrador",
      e
    );
    return "";
  }
}

module.exports = {
  buscarTema,
  crearTema,
};
