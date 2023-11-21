const { Router } = require("express");
const multer = require("multer"); // Middleware для обработки файлов
const Card = require("../models/CartModel");
const router = Router();

// Настройка multer для сохранения файлов в папку 'public/images/category'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/categoria1");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const categoria1 = [];
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const filePath = `/img/categoria1/${req.file.filename}`;

    categoria1.push({
      filePath: filePath,
      title: req.body.title,
      description: req.body.description,
    });

    Card.save(req.body.title, req.body.description, filePath);

    res.send(categoria1);
  } catch (error) {
    console.error("Ошибка при сохранении данных:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
