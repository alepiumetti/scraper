const express = require("express");
const app = express();
const morgan = require("morgan");
var exphbs = require("express-handlebars");
const path = require("path");
var cors = require("cors");
const { Router } = require("express");
const router = Router();
const data = require("./data/data.json");
let scraper = require("./scraper");

//settings

app.set(`port`, process.env.PORT || 3000);

app.engine("handlebars", exphbs());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

//middlewares

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes

router.get("/api/dolar", (req, res) => {
  scraper.then(() => {
    res.json(data);
  });
});

//starting server

app.listen(app.get(`port`), () => {
  console.log(`Server on http://localhost:${app.get(`port`)}`);
});
