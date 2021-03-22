const { Router } = require('express');
const router = Router();
const { creartipo } = require('../../controllers/tipo_solicitud/tipo_solicitud.controlador');
const {  crearSolicitud } = require('../../controllers/solicitud/solicitud.controlador');
const { validarJWT, validarDeJWTRoleCliente } = require('../../middlewares/validar-jwt');

router.post('/tipo/',  creartipo);
router.post('/', [validarJWT, validarDeJWTRoleCliente], crearSolicitud);

module.exports = router;