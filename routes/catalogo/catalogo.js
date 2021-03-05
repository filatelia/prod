/*
    Ruta: /api/catalogo/
*/
const { Router } = require('express');
const router = Router();
const { crearCatalogo, mostrarCatalogo } = require('../../controllers/catalogo/catalogo.controlador');
const { verificarTemaYCrearlo } = require('../../middlewares/excel');



router.post( '/', [verificarTemaYCrearlo], crearCatalogo);

module.exports = router;