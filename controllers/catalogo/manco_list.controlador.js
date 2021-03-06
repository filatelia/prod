const { response } = require("express");
const Mancolist = require("../../models/catalogo/manco_list");
const Usuario = require("../../models/usuario/usuario");

const { retornarDatosJWT } = require("../../middlewares/validar-jwt");

const actualizarMancolist = async (req, res = response) => {
  console.log("entramos:", req.body);
  const { id_estampilla } = req.body;

  const token = req.header("x-access-token");

  const email = retornarDatosJWT(token);

  console.log("retornare dartos token", email);

  const { _id } = await Usuario.findOne({ email });

  const id_usuario = _id;

//creando objeto tipo mancolista para guardar en bd
  const objBody = new Object();
  objBody.id_usuario = _id;
  objBody.id_estampilla;

  //   objBody.id_usuario = id_usuario.replace(/\s+/g,"");
  //  objBody.id_estampilla = id_estampilla.replace(/\s+/g,"");

  //Buscando si en la base de datos collecion mancolosta existe ya el usuario
  const existeManco_list = await Mancolist.findOne({ id_usuario });


  //validando la existencia para crear un nuevo documento o actualizar
  if (existeManco_list == null) {
    const objParaGuardar = new Mancolist(objBody);
    const mancolistGuardada = await objParaGuardar.save();
    console.log("Mancolista guardada: ", mancolistGuardada.id_usuario);
    return res.json({
        ok: true,
        msg: mancolistGuardada
    });
  } else {

    var uidsEstampillasBD = new Array();

    console.log("_id:", existeManco_list._id);
    await Mancolist.findByIdAndDelete({ _id: existeManco_list._id });
    
    //Creanndo nuevo onbjeto con id mancolista actualizada
    uidsEstampillasBD.id_usuario = id_usuario;
    uidsEstampillasBD.id_estampilla = id_estampilla;

    //Guardando la nueva ancolista del usuario
    const nuevoObjMancolist = new Mancolist(uidsEstampillasBD);
    await nuevoObjMancolist.save();
  }
};

const compartirManco_list = async (req, res = response) => {
  const token = req.header("x-access-token");

  const email = retornarDatosJWT(token);
  if (email != null) {
    console.log("retornare dartos token", email);

    const { _id } = await Usuario.findOne({ email });
    const obj = await Mancolist.findOne({ id_usuario: _id });

    return res.json({
      ok: true,
      msg: obj,
    });

    console.log("Obj en bd", obj);
  } else {
    res.status(400).json({
      ok: false,
      msg:
        "Ha ocurrido un error de seguridad, no tienes los permisos necesacios.",
    });
  }
};

module.exports = {
  actualizarMancolist,
  compartirManco_list,
};
