
const { eliminarFichero } = require('./eliminar_fichero');
const { validarJWT, validarDeJWTRoleAdmin } = require('./validar-jwt');



module.exports = {
    validarDeJWTRoleAdmin,
    validarJWT,
    eliminarFichero
}