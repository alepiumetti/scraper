const { Router } = require("express");
const router = Router();
const data = require("../data/data.json");

router.get("/api/dolar", (req, res) => {
  res.json(data);
});

module.exports = router;
