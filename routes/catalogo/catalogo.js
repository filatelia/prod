/*
    Ruta: /api/catalogo/
*/
const { Router } = require('express');
const router = Router();
const { crearCatalogo, mostrarCatalogo } = require('../../controllers/catalogo/catalogo.controlador');
const { verificarTemaYCrearlo } = require('../../middlewares/excel');
const { validarJWT,validarDeJWTRoleAdmin } = require('../../middlewares/index.middle');



//router.post( '/', [validarJWT, validarDeJWTRoleAdmin, verificarTemaYCrearlo ], crearCatalogo);
router.post( '/', [ ], crearCatalogo);

router.get( '/', [], mostrarCatalogo);

module.exports = router;