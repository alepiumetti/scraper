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
      list.push({
        tipo: cronista(element).find("a").text().replace("t", "."),
        transaccion: cronista(element).find("div.numAsk").text(),
        valor: cronista(element).find("div.numDolar").text(),
      });
    });

    dolarCronista = { list };

    console.log(dolarCronista);
  } catch (error) {
    console.warn(error);
  }
}

init();
