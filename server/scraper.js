const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { write } = require("lowdb/adapters/FileSync");

const adapter = new FileSync(`${__dirname}/data/db.json`);
const db = low(adapter);
async function init() {
  let datosDolar;
  let datosDolarJSON;
  let datosDB;

  try {
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

          /* if (object[tipoDolar] === undefined) {
          } else {
            object[tipoDolar] = { ...object[tipoDolar], venta: valor[i] };
          } */
        } else {
          object[tipoDolar] = {
            ...object[tipoDolar],
            compra: valor[i],
          };
        }
      }
    });

    datosDolar = object;
    datosDolarJSON = JSON.stringify(object);
  } catch (error) {
    console.error("Error en la petición de datos: ", error);
  }

  try {
    await db.update(datosDolar, datosDolar).write();

    console.log("creación de archivo datosDolar", datosDolarJSON);
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
