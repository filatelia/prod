/*
    Ruta: /api/catalogo/
*/
const { Router } = require('express');
const router = Router();
const { crearCatalogo } = require('../../controllers/catalogo/catalogo.controlador');



router.post( '/',  crearCatalogo);

module.exports = router;