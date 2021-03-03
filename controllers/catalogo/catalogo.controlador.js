const { response } = require("express");
var excel = require("xlsx");
const { procesarExcel } = require("../../middlewares/excel");

const Catalogo = require("../../models/catalogo/catalogo");

const crearCatalogo = async (req, res = response) => {
  try {
    const obt = req.files;
    //    console.log("log: ", obt);

    const datos = procesarExcel(obt);

    console.log(datos);

    for (let index = 0; index < datos.length; index++) {
      const element = datos[index];
      console.log("Fila " + (index + 1) + " :", element);
    }

    res.json({ datos });
  } catch (e) {
    res.json({ ok: false, msg: e });
  }
};

module.exports = {
  crearCatalogo,
};
