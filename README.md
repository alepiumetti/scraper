# API + Scraper + Web

## Scraper 

Scraper hecho con NodeJS y [Cheerio](https://cheerio.js.org/) que toma los valores del dolar en [El Cronista](https://www.cronista.com/MercadosOnline/dolar.html) y los guarda en una API no oficial. 

## API

El API está hecha con ExpressJS y hosteada en Heroku. 

En el caso de que los valores del Dolar cambien, se actualiza cada 30 minutos. 

### Uso

Pedir los valores a [https://api-scrapper.herokuapp.com/api/dolar](https://api-scrapper.herokuapp.com/api/dolar)

El servidor te devolverá un JSON de Formato:

`{ "tipoDeDolar":{"compra":Float, "venta":Float} }`


` {"dolarbanconacion":{"compra":79.25,"venta":85.25},"dolarblue":{"compra":159,"venta":164},"dolarsolidario":{"venta":140.66},"dolarmayorista":{"compra":79.95,"venta":80.15},"dolarmepcontado":{"compra":146.05,"venta":147.01},"dolarcdocliqui":{"compra":149.07,"venta":149.14}}`

## Web

La web está hecha con HTML y JS Vanilla, hosteada en Firebase Hosting. Pide los datos a través de axios.

Podés acceder a la web [acá](https://scraper-3c915.web.app/)

## Importante

El API no está funcionando correctamente por lo que la web no está consumiendo los datos. 
