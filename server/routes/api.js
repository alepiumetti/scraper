const { Router } = require("express");
const router = Router();
const data = require("../data/db.json");
const intervalScraper = require("../scraper");

router.get("/api/dolar", (req, res) => {
  intervalScraper;
  console.log("data", data);
  res.json(data);
});

module.exports = router;
