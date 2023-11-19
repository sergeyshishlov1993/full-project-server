const { Router } = require("express");
const path = require("path");
const fs = require("fs").promises; // Используй promises версию fs
const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await getBd();
    res.send(data);
  } catch (error) {
    console.error("Ошибка при чтении данных:", error);
    res.status(500).send("Internal Server Error");
  }
});

async function getBd() {
  const filePath = path.join(__dirname, "..", "data", "fakeData.json");

  try {
    const content = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(content);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    throw new Error(`Ошибка при чтении файла: ${err.message}`);
  }
}

module.exports = router;

// Теперь ты можешь вызвать getList() где-то в твоем коде
// Например, если getList() находится в другом файле, экспортируй функцию и импортируй в нужном месте.
