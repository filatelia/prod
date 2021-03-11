const { response } = require("express");
const bcrypt = require("bcryptjs");
const { crearImagen } = require("../../middlewares/subir_imagen");
const Usuario = require("../../models/usuario/usuario");
const { eliminarFichero } = require("../../middlewares/index.middle");
const { isValidObjectId } = require("mongoose");

const getUsuario = async (req, res) => {
  const usuarios = await Usuario.find(
    { estado: true },
    "name  email roleuser imagenP telefono dir_linea1 dir_linea2 ciudad provincia pais codigopostal estado"
  );
  res.json({
    ok: true,
    usuarios,
  });
};

//Función para crear un usuario.

const createUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario_ = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();
    usuario_.password = bcrypt.hashSync(password, salt);
    usuario_.imagenP =
      "../uploads/imagenes/predeterminadas/" + usuario_.roleuser + ".png";
    console.log("antes de guardar: ", usuario_);
    // Guardar usuario
    await usuario_.save();

    res.json({
      ok: true,
      usuario_,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const deleteUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {

    if(!isValidObjectId(uid)){
      return res.json({
        ok: false,
        msg: "No has proporcionado un dato de usuario válido - notValidObjet"
      });
      
    }

    const usuario_ = await Usuario.findById(uid);
    if (!usuario_) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

    //Eliminando fichero de imagen
    eliminarFichero();

    await Pais.findByIdAndDelete(uid);

    return res.json({
      ok: true,
      msg: "usuario eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
      error: e,
    });
  }
};

const updateUusuario = async (req, res = response) => {
  const { uid } = req.body;

  try {
    // Actualizaciones

    const { password, cuidad, ...campos } = req.body;

    const salt = bcrypt.genSaltSync();
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    // Creando imagen
    // var urlImagen = crearImagen (req.files, "prueba/imgUser");
    //console.log("url imagen desde controlador: ", urlImagen);
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      msg: usuarioActualizado,
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
  getUsuario,
  createUsuario,
  deleteUsuario,
  updateUusuario,
};
