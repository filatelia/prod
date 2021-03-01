/*
    Ruta: /api/catalogo/uploads
*/
const { Router } = require('express');
const { createImage } = require('../../controllers/catalogo/uploads.controlador');
const router = Router();
const {validarImg, verificarRepetida} = require('../../middlewares/cat_imagenes');


router.post( '/', [validarImg, verificarRepetida], createImage);

module.exports = router;