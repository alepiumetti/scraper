const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");

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

    datosDolar = JSON.stringify(object);

    console.log(datosDolar);
  } catch (error) {
    console.error("Error en la petición de datos: ", error);
  }

  try {
    fs.writeFileSync(`${__dirname}/data/data.json`, datosDolar, "utf8");
  } catch (error) {
    console.error("Error en la creación de datos: ", error);
  }
}

let interval;

function intervalScraper() {
  interval = setInterval(() => {
    init();
  }, 1000 * 60 * 30);
}

module.exports = intervalScraper();
