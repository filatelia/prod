
const { validarJWT, validarDeJWTRoleAdmin, retornarDatosJWT } = require('./validar-jwt');
const { crearImagen,eliminarImagenServidor } = require("./subir_imagen");
const { buscarTema, crearTema } = require("./buscar_crear_tema_cat");





module.exports = {
    validarDeJWTRoleAdmin,
    validarJWT,
    retornarDatosJWT,
    eliminarImagenServidor, 
    crearImagen,
    buscarTema, 
    crearTema
}