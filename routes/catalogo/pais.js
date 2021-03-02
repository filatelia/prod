/*
    Ruta: /api/catalogo/paises
*/
const { Router } = require('express');
const { getPaisByName, createPais, updatePais, deletePais } = require('../../controllers/catalogo/pais.controlador');
const router = Router();

router.get( '/:name',getPaisByName );
router.post('/',createPais);
router.put('/:id', updatePais)
router.delete('/:id', deletePais)
module.exports = router;