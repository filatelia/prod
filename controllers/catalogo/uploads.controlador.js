const { response } = require("express");
const path = require("path");
const Imagenes = require("../../models/catalogo/uploads");

const getImages = async (req, res) => {
  const images = await imagenes.find();
  res.json({
    ok: true,
    images,
  });
};

const createImage = async (req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No hay un archivo seleccionado");
    return;
  }

  console.log("imagen: ", req.files); 

  const { sampleFile } = req.files;

  const uploadPath = path.join(
    __dirname,
    "../../uploads/imagenes/" + sampleFile.name
  );

  sampleFile.mv(uploadPath, (err) => {
    if (err) {
      console.log("error:", err);
      return res.status(500).json({
        msg: err,
      });
    }

  });

  const imagen_url = "/uploads/imagenes/" + sampleFile.name;

  //Guardando informacion de la imagen en la bd.
  req.body.name = sampleFile.name;
  req.body.imagen_url= imagen_url;
  const imagen_ = new Imagenes( req.body);
  // Guardar usuario
  await imagen_.save();
  res.json({
      ok: true,
      imagen_
  });
};

const deleteImage = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const image_ = await imagenes.findById(uid);
    if (!image_) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un image por ese id",
      });
    }

    const imageActualizado = await imagenes.findByIdAndUpdate(
      uid,
      { estado: false },
      { new: true }
    );

    //await Pais.findByIdAndDelete( uid );

    res.json({
      ok: true,
      msg: "image eliminado",
      pais: imageActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const updateImage = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const image_ = await imagenes.findById(uid);

    if (!image_) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un image por ese id",
      });
    }
    // Actualizaciones
    const { name, ...campos } = req.body;

    if (image_.name !== name) {
      const existeimage = await imagenes.findOne({ name });
      if (existeimage) {
        return res.status(400).json({
          ok: false,
          msg: "ya existe un image con ese nombre",
        });
      }
    }

    const imageActualizado = await imagenes.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      anio: imageActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  getImages,
  createImage,
  deleteImage,
  updateImage,
};
