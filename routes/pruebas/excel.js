const { Router } = require('express');
const { deExcelAJson } = require('../../controllers/pruebas/excel');
const router = Router();

router.post( '/', deExcelAJson );

module.exports = router;
