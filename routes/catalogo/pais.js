/*
    Ruta: /api/catalogo/paises
*/
const { Router } = require('express');
const { getPaisByName, getPaisById, getTodosPaises } = require('../../controllers/catalogo/pais.controlador');
const router = Router();

router.get( '/:name',getPaisByName );
router.get( '/pid/:pid',getPaisById );

module.exports = router;