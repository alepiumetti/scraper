const cheerio = require("cheerio");
const request = require("request-promise");

async function init() {
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

    let dolarCronista = {};
    const list = [];

    cronista("div.cotizacion").each((index, element) => {
      let transaccion = [];
      let valor = [];
      let object = {};

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

      list.push(object);
    });

    dolarCronista = list;

    console.log(dolarCronista);
  } catch (error) {
    console.warn(error);
  }
}

init();
