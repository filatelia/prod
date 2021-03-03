/*
    Ruta: /api/catalogo/
*/
const { Router } = require('express');
const router = Router();
const { crearCatalogo } = require('../../controllers/catalogo/catalogo.controlador');
const { verificarTema } = require('../../middlewares/excel');


router.post( '/', verificarTema, crearCatalogo);

module.exports = router;