let dolar;

const data = async () => {
  try {
    dolar = await fetch("https://api.alejandropiumetti.com.ar/api/dolar");

    let obj = Object.keys(dolar.data);
    Object.keys(dolar.data).forEach((key) => {
      const hilera = document.createElement("tr");

      let tipoDolar = document.createElement("td");
      let compraDolar = document.createElement("td");
      let ventaDolar = document.createElement("td");

      tipoDolar.className = "row";
      compraDolar.className = "row";
      ventaDolar.className = "row";

      tipoDolar.innerHTML = cambioTipoDolar(key);
      compraDolar.innerHTML = reval(dolar.data[key].compra);
      ventaDolar.innerHTML = reval(dolar.data[key].venta);

      hilera.appendChild(tipoDolar);
      hilera.appendChild(compraDolar);
      hilera.appendChild(ventaDolar);

      tablaDolar.appendChild(hilera);
    });
  } catch (error) {
    console.log(error);
  }
};

const tablaDolar = document.getElementById("tabla-dolar");
data();

function cambioTipoDolar(tipoDolar) {
  switch (tipoDolar) {
    case "dolarbna":
      return "Dólar Banco Nación";
      break;
    case "dolarblue":
      return "Dólar Blue";
      break;
    case "dolarsolidario":
      return "Dólar Solidario";
      break;
    case "dolarmayorista":
      return "Dólar Mayorista";
      break;
    case "dolarmepcontado":
      return "Dólar MEP Contado";
      break;
    case "dolarcdocliqui":
      return "Dólar Contado c/liqui";
      break;
    default:
      return tipoDolar;
      break;
  }
}

function reval(value) {
  if (value === undefined) {
    return "-";
  } else {
    return `$${value}`;
  }
}
