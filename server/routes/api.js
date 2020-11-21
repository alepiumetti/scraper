const { Router } = require("express");
const router = Router();
const data = require("../data/data.json");
const scraper = require(`${__dirname}/data/data.json`);

router.get("/api/dolar", (req, res) => {
  scraper;

  res.json(data);
});

module.exports = router;
