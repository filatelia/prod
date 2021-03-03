const { response } = require("express");
const Pais = require("../../models/catalogo/paises");
const fs = require("fs");
const Path = require("path");

const getPaisById = async (req, res = response) => {
  const _id = req.params.pid;

  const paisEncontrado = await Pais.findOne({ _id });
  console.log("pais encontrado", paisEncontrado);
  if (!paisEncontrado) {
    return res.json("No se ha encontrado el pais con el id proporcionado");
  }

  const pahtImagen = Path.join(__dirname, "../.." + paisEncontrado.img);
  paisEncontrado.img = pahtImagen;

  return res.json(paisEncontrado);
};

const getPaisByName = async (req, res = response) => {
  const names = req.params.name;

  if (names != "all") {
    try {
      const para_buscar = names.toLowerCase().replace(/\s+/g, "");
      console.log("para buscar:", para_buscar);
      const paisEncontrado = await Pais.findOne({ para_buscar });
      console.log("pais encontrado", paisEncontrado);
      if (!paisEncontrado) {
        return res.json(
          "No se ha encontrado el pais, recuerde no usar caracteres especiales"
        );
      }

      const pahtImagen = Path.join(__dirname, "../.." + paisEncontrado.img);
      paisEncontrado.img = pahtImagen;

      return res.json(paisEncontrado);
    } catch (e) {
      res.json({msg: e});
    }
  } else {
    console.log("all, buscando");
    const ret = await getTodosPaises();
    return res.json({ ok: true, msg: ret });
  }
};

const getTodosPaises = async (req, res = response) => {
  const paisEncontrado = await Pais.find();
  for (let index = 0; index < paisEncontrado.length; index++) {
    console.log(paisEncontrado[index].name);
    paisEncontrado[index].img = Path.join(
      __dirname,
      "../.." + paisEncontrado[index].img
    );
  }

  return paisEncontrado;
};

module.exports = {
  getPaisByName,
  getPaisById,
  getTodosPaises,
};
