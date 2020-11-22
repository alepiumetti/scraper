const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");

var Datastore = require("nedb"),
  db = new Datastore({ filename: `${__dirname}/data/data.json` });
db.loadDatabase(function (err) {
  console.log("error en la carga de DB", err);
  // Callback is optional
  // Now commands will be executed
});

async function init() {
  let datosDolar;

  try {
    // const nacion = await request({
    //   uri: "https://www.bna.com.ar/Personas",
    //   transform: (body) => cheerio.load(body),
    // });

    // const santander = await request({
    //   uri: "https://banco.santanderrio.com.ar/exec/cotizacion/index.jsp",
    //   transform: (body) => cheerio.load(body),
    // });

    // const galicia = await request({
    //   uri:
    //     "https://www.bancogalicia.com/banca/online/web/Personas/ProductosyServicios/Cotizador",
    //   transform: (body) => cheerio.load(body),
    // });

    const cronista = await request({
      uri: "https://www.cronista.com/MercadosOnline/dolar.html",
      transform: (body) => cheerio.load(body),
    });

    let object = {};

    cronista("div.cotizacion").each((index, element) => {
      let transaccion = [];
      let valor = [];

      let tipoDolar = cronista(element).find("a").text().trim();

      tipoDolar = tipoDolar //parser
        .toLowerCase()
        .replace(/ó/g, "o")
        .replace(/ /g, "")
        .replace("/", "");

      cronista(element)
        .find("div.numAsk") //target compra/venta
        .each((i, subElement) => {
          transaccion.push(cronista(subElement).html().trim());
        });

      cronista(element)
        .find("div.numDolar") //target dolar values
        .each((i, subElement) => {
          valor.push(
            parseFloat(
              cronista(subElement).html().trim().slice(2).replace(",", ".")
            )
          );
        });

      for (var i = 0; i < transaccion.length; i++) {
        if (transaccion[i] === "Venta") {
          object[tipoDolar] = { ...object[tipoDolar], venta: valor[i] };
        } else {
          object[tipoDolar] = {
            ...object[tipoDolar],
            compra: valor[i],
          };
        }
      }
    });

    // datosDolar = JSON.stringify(object);
    datosDolar = object;

    console.log(object);
  } catch (error) {
    console.error("Error en la petición de datos: ", error);
  }

  try {
    db.insert(datosDolar, function (error) {
      console.error("Error en la carga de datos:", error);
    });
    // fs.writeFileSync(`${__dirname}/data/data.json`, datosDolar, "utf8");
    console.log("creación de archivo datosDolar", datosDolar);
    console.log("`${__dirname}/data/data.json`", `${__dirname}/data/data.json`);
  } catch (error) {
    console.error("Error en la creación de datos: ", error);
  }
}

let interval;

function intervalScraper() {
  interval = setInterval(() => {
    init();
  }, 1000 * 30);
}

module.exports = intervalScraper();
