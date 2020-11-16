// Make a request for a user with a given ID

let dolar;

const data = async () => {
  try {
    dolar = await axios.get("http://localhost:5001/api/dolar");
  } catch (error) {
    console.log(error);
  }
};

const tablaDolar = document.getElementById("tabla-dolar");
data();

setTimeout(() => {
  console.log("dolar", dolar.data);
  let obj = Object.keys(dolar.data);
  Object.keys(dolar.data).forEach((key) => {
    const hilera = document.createElement("tr");

    let tipoDolar = document.createElement("td");
    let compraDolar = document.createElement("td");
    let ventaDolar = document.createElement("td");
    tipoDolar.innerHTML = key;
    compraDolar.innerHTML = dolar.data[key].compra;
    ventaDolar.innerHTML = dolar.data[key].venta;
    hilera.appendChild(tipoDolar);
    hilera.appendChild(compraDolar);
    hilera.appendChild(ventaDolar);

    tablaDolar.appendChild(hilera);
  });
}, 3000);

//https://www.lacapital.com.ar/rss/economia.xml
//https://www.clarin.com/rss.html
//https://www.cronista.com/rss.html
//https://servicios.lanacion.com.ar/herramientas/rss/ayuda
//https://www.pagina12.com.ar/pagina/rss
