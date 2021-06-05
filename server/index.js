const express = require("express");
const app = express();
var cors = require("cors");

//settings

app.set(
  `port`,
  /*process.env.PORT || selecciona el puerto que brinda el servidor */ 3000
);

//middlewares

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes

app.use(require("./routes/api"));

//starting server

app.listen(app.get(`port`), () => {
  console.log(`Server on http://localhost:${app.get(`port`)}`);
});
