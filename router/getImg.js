const { Router } = require("express");
const Card = require("../models/CartModel");
const router = Router();

router.get("/", async (req, res) => {
  const db = await Card.getDB();

  res.send(db);
});

module.exports = router;
