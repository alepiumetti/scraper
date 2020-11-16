const express = require("express");
const app = express();
const morgan = require("morgan");
var exphbs = require("express-handlebars");
const path = require("path");
var cors = require("cors");
let scraper = require("./scraper");

//settings

app.set(`port`, process.env.PORT || 3000);

app.engine("handlebars", exphbs());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

//middlewares

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(scraper;

//routes

app.use(require("./routes/api"));

//starting server

app.listen(app.get(`port`), () => {
  console.log(`Server on http://localhost:${app.get(`port`)}`);
});

exports.app = functions.https.onRequest(app);