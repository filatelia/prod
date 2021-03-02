const fs = require("fs");
const Path = require("path");
const axios = require("axios");
const { model } = require("mongoose");
const Paises = require("../models/catalogo/paises");
const crearPaisesAutom = async (upaises) => {
  try {
      console.log("Creando paises ...");

    for (let index = 0; index < upaises.length; index++) {
      const element = upaises[index];

      const paisNuevo = new Paises(element);
      await paisNuevo.save();
    }

    var obj = new Object();
    obj.status = 200;
    obj.total = upaises.length;
    return obj;
  } catch (e) {
    return e;
  }
};

module.exports = {
  crearPaisesAutom,
};
