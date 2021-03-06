/*
    Ruta: /api/catalogo/manco_list/:idu
*/
const { Router } = require('express');
const router = Router();
const { actualizarMancolist, compartirManco_list } = require('../../controllers/catalogo/manco_list.controlador');
const { validarJWT } = require("../../middlewares/validar-jwt");

router.post( '/listar/',[validarJWT], compartirManco_list);
router.post( '/',[validarJWT], actualizarMancolist);

module.exports = router;
