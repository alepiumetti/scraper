// Make a request for a user with a given ID

getData = () => {
  axios
    .get("http://localhost:3000/api/dolar")
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};

const tablaDolar = document.getElementById("tabla-dolar");

let data = getData();
