const { Router } = require("express");
const router = Router();
const data = require("../data/data.json");
const scraper = require("../scraper");

router.get("/api/dolar", (req, res) => {
  scraper;

  res.json(data);
});

module.exports = router;
