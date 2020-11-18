const { Router } = require("express");
const router = Router();
const data = require("../data/data.json");
const scraper = require("../scraper");

router.get("/api/dolar", (req, res) => {
  let updateData = setInterval(() => {
    scraper;
  }, 1000 * 30);

  updateData;

  res.json(data);
});

module.exports = router;
