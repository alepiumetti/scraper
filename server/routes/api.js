const { Router } = require("express");
const router = Router();
const data = require("../data/db.json");
const scraper = require("../scraper");

router.get("/api/dolar", (req, res) => {
  scraper;
  console.log("data", data);
  res.json(data.datosDolar);
});

module.exports = router;
