const Paises = require("../models/catalogo/paises");
const axios = require("axios");
const { guardandoBanderas } = require("../middlewares/banderas");
const {crearPaisesAutom} = require("../middlewares/paises");

const verificarBanderasPaises = async () => {
  console.log("Verificando las banderas de los paises");

  //se verifica en la base de datos que existan paises, sino se consultan y se guardan.
  const existePais = await Paises.find();

  if (existePais.length == 0) {
    console.log("*No existen paises, crenado paises");

    //servicio para consultar informacion de los mpaises y liego guardarla
    const datosPaises = await axios({
      method: "GET",
      url: "https://restcountries.eu/rest/v2",
    });

    //mapeando los datos obtenidos del servicio, usando sólo lo que necesitamos
    const upaises = await datosPaises.data.map((datos) => ({
      name: datos.name,
      
      uriBandertas: datos.flag,
      moneda_nombre: datos.currencies[0].name,
      moneda_code: datos.currencies[0].code,
      abreviatura_uno: datos.alpha2Code,
      abreviatura_dos: datos.alpha3Code,
      img:
        "/imagenes/banderas_paises/" +
        datos.alpha3Code.toLowerCase() +
        ".svg",
    }));
    const resBan = await guardandoBanderas(await upaises);

    //se verifica que todo haya salido bien en la descarga de las imagen al servidor
    if (resBan.estado == 200) {
      console.log("Se han creado : ", resBan.banderas, " banderas");
  
    }else{
      console.log("error al crear los paieses: ", resBan);
    }

    const paisesCreados= await crearPaisesAutom(upaises);
    console.log("creando pasises: ", paisesCreados);

    console.log("Paises creados: ", paisesCreados.total);








  } else {
    console.log("*Paises OK");
  }
};

module.exports = {
  verificarBanderasPaises,
};
