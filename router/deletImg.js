const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const Card = require("../models/CartModel");

const router = Router();

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Получаем текущие данные
    const db = await Card.getDB();
    // Ищем индекс элемента по id
    const idx = db.findIndex((el) => el.id == id);
    const filePath = db[idx].src;

    const removeFilePath = path.join(__dirname, "..", "public", filePath);

    if (idx !== -1) {
      // Удаляем элемент из данных
      db.splice(idx, 1);
      fs.unlink(removeFilePath, (err) => {
        if (err) throw err;

        console.log("delet");
      });
      // Обновляем данные в файле
      await Card.updateDataInFile(db);
      res.status(200).send({ success: true });
    } else {
      res.status(404).send({ success: false, message: "Element not found" });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
