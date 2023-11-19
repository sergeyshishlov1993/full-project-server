const { Router } = require("express");
const User = require("../models/addModel");
const router = Router();

router.post("/", async (req, res) => {
  try {
    await User.save(req.body.email, req.body.password);
    res.send("ok");
  } catch (error) {
    console.error("Ошибка при сохранении данных:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
