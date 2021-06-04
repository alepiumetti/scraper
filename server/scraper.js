const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");

async function init() {
  let datosDolar;
  let datosDolarJSON;

  try {
    const cronista = await request({
      uri: "https://www.cronista.com/MercadosOnline/dolar.html",
      transform: (body) => cheerio.load(body),
    });

    let object = {};

    cronista("li[data-vplscroll-item]").each((index, element) => {
      // console.log(cronista(element).html());

      let tipoDolar = cronista(element).find("span[class=name]").text().trim();
      // target al nombre del tipo de dolar
      // devuelve string

      var regex =
        /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g; //expresión regular para parsear el tipo de dato.

      tipoDolar = tipoDolar
        .toString() //parser
        .toLowerCase()
        .replace(regex, "o")
        .replace(/ó/gi, "o")
        .replace(/ /g, "")
        .replace("/", "");

      //parsea string con minuscula, sin espacio y caracteres normales

      if (cronista(element).find("div[class=sell-value]").html() != null) {
        object = {
          ...object,
          [tipoDolar]: {
            compra: parseFloat(
              cronista(element)
                .find("div[class=buy-value]")
                .text()
                .replace(",", ".")
            ), //target compra
            venta: parseFloat(
              cronista(element)
                .find("div[class=sell-value]")
                .text()
                .replace(",", ".")
            ), //target venta
          },
        };
      }
    });

    datosDolar = object;
    datosDolarJSON = JSON.stringify(object);
  } catch (error) {
    console.error("Error en la petición de datos: ", error);
  }

  try {
    await fs.writeFileSync(`${__dirname}/data/db.json`, datosDolarJSON);

    console.log("creación de archivo datosDolar", datosDolarJSON);
  } catch (error) {
    console.error("Error en la creación de datos: ", error);
  }
}

let interval;

function intervalScraper() {
  init();
  interval = setInterval(() => {}, 1000 * 60 * 30);
}

module.exports = intervalScraper();
