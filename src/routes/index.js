const { Router } = require("express");
const router = Router();
const data = require("../../data/data.json");

router.get("/api/dolar", (req, res) => {
  res.send(data);
});

module.exports = router;
