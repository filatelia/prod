var excel = require("xlsx");
const { response } = require("express");
const Temas = require('../models/catalogo/temas');
const Pais =  require('../models/catalogo/paises');
const verificarTema = async (req, res = response, next) =>{
    const exc = req.files;

    const datos = procesarExcel(exc);
    console.log("datossss: ", datos);

    for (let index = 0; index < datos.length; index++) {
        const element = datos[index];
        console.log("element: ", element.PAIS);
        const name = element.PAIS;

        const pais = await Pais.findOne({ name });
        console.log("pasis: ", pais);
        
    }

    next();
  

    
}


function procesarExcel(exc) {
  try {
    const tmp = exc.sampleFile.tempFilePath;
    const ex = excel.readFile(tmp);

    const nombreHoja = ex.SheetNames;
    let datos = excel.utils.sheet_to_json(ex.Sheets[nombreHoja[0]]);
    return datos;
  } catch (e) {
    console.log("error: ", e);
  }
}

module.exports = {
  procesarExcel,
  verificarTema
};
