/*
    Ruta: /api/catalogo/
*/
const { Router } = require('express');
const router = Router();
const { crearCatalogo } = require('../../controllers/catalogo/catalogo.controlador');
const { verificarTemaYCrearlo, asignarImagenes } = require('../../middlewares/excel');


router.post( '/', [verificarTemaYCrearlo], crearCatalogo);

module.exports = router;