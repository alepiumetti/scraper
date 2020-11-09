const express = require("express");
const app = express();
const morgan = require("morgan");

//settings

app.set(`port`, process.env.PORT || 3000);

//middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes

app.use(require("../routes/index"));

//starting server

app.listen(3000, () => {
  console.log(`Server on http://localhost:${app.get(`port`)}`);
});
